
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
    return {
      _id: result._id,
      email: result.email,
    };
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

      const result = await this.save(user);

      var url = `${process.env.BASE_URL}/api/user/reset-password/${token}`;
      var from = 'no-reply@test.com';
      var to = 'armandomendivil.m@gmail.com';
      var subject = 'Hello';
      var body = `Your url ${url}`;

      await mail.send(from, to, subject, body);
      return { data: result, token };
    } catch (e) {
      throw e;
    }
  }

  /**
   * Reset password
   * @type {String} token - token by url
   * @return {object} user - User fetched by findOne method
   */
  async resetPassword (token = '') {
    var query = {
      $and: [
        { resetPasswordToken: token },
        { resetPasswordExpires: { $gt: new Date() } },
      ],
    };

    // Fetch user
    var user = await this.dataDL.findOne(query);
    if (user) {
      return user;
    } else {
      var err = new Error();
      err.name = 'TokenExpired';
      throw err;
    }
  }
}

module.exports = UsersBL;
