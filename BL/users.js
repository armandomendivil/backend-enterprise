
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mail = require('../micro-mail');
const DataDL = require('../DL/users');

class UsersBL extends DataDL {
  constructor (name) {
    super();
    this.name = name;
    this.dataDL = new DataDL(name);
  }

  /**
   * Get all users
   * @param {object} query - The query parameters
   * @param {string} query.search - Search for multiple fields
   * @param {object} pagination - The pagination paramaters
   * @param {number} pagination.limit - The pagination limit
   * @param {number} pagination.offset - The pagination offset
   * @return {array} users
   */
  async findAll (query, pagination) {
    const result = await this.dataDL.findAll(query, pagination);
    return result;
  }

  async findOne (query = {}, fields = { _id: 1, email: 1, password: 1 }) {
    const result = await this.dataDL.findOne(query, fields);
    return result;
  }

  async save (document) {
    const result = await this.dataDL.save(document);
    return result;
  }

  async validate (password, userPwd) {
    return await bcrypt.compare(password, userPwd);
  }

  /**
   * Forgot password
   * @type {string} email - User email
   * @return {object} user - User fetched by findOne method
   */
  async forgotPassword (email = '') {
    try {
      var buffer = await crypto.randomBytes(16);
      var token = buffer.toString('hex');
      var tokenExp = Date.now() + 3600000; // 1 hour
      var user = await this.dataDL.findOne({ email });
      if (!user) throw new Error('Please check that the email matches your login information.');

      user.resetPasswordToken = token;
      user.resetPasswordExpires = tokenExp;

      await this.save(user);

      var url = `${process.env.BASE_URL}/api/user/reset-password/${token}`;
      var from = 'no-reply@test.com';
      var to = user.email;
      var subject = 'Hello';
      var body = `Hi ${user.email} - Your url: ${url}`;

      await mail.send(from, to, subject, body);
      return { message: 'Check your email to recover password.' };
    } catch (e) {
      throw e;
    }
  }

  /**
   * Validate reset password
   * @type {String} token - token by url
   * @return {object} user - User fetched by findOne method
   */
  async validateResetToken (token = '') {
    var fields = { _id: 1, email: 1 };
    var query = {
      $and: [
        { resetPasswordToken: token },
        { resetPasswordExpires: { $gt: new Date() } },
      ],
    };

    // Fetch user
    var user = await this.dataDL.findOne(query, fields);
    if (user) {
      return user;
    } else {
      var err = new Error();
      err.name = 'TokenExpired';
      throw err;
    }
  }

  /**
   * Reset password
   * @type {string} token - User token
   * @type {string} password - User password
   * @return {object} user - User fetched by findOne mehtod
   */
  async resetPassword (token = '', password = '') {
    var fields = { _id: 1, email: 1 };
    var query = {
      $and: [
        { resetPasswordToken: token },
        { resetPasswordExpires: { $gt: new Date() } },
      ],
    };

    var user = await this.dataDL.findOne(query, fields);
    if (user) {
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      var result = await this.save(user);
      return result;
    } else {
      var err = new Error();
      err.name = 'TokenExpired';
      throw err;
    }
  }

  async changePassword (email, oldPassword, newPassword) {
    try {
      var isMatch = false;
      var user = await this.findOne({ email });
      if (user) {
        isMatch = await this.validate(oldPassword, user.password);
      } else {
        throw new Error('User not found.');
      }

      if (isMatch) {
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        var result = await this.save(user);
        return result;
      } else {
        throw new Error('Incorrect password.');
      }
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UsersBL;
