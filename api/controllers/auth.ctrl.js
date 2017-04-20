
const { createToken } = require('../helpers');
const UsersBL = require('../../BL/users');
const usersBL = new UsersBL();

/**
 * Register user
 * @param {string} [email] - The user's email
 * @param {string} password - The user's password
 * @return {string} token - The user's token
 */
async function register (req, res, next) {
  try {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
    };

    var user = await usersBL.save(newUser);
    var token = createToken(user);
    return res.send({ data: user, token });
  } catch (e) {
    throw e;
  }
}

async function login (req, res, next) {
  const { email, password } = req.body;
  let isMatch = false;
  let query = { email: email };
  let token;

  var err = new Error();
  err.name = 'AuthenticationFailed';

  try {
    // Find user by email
    var user = await usersBL.findOne(query);
    if (user) {
      isMatch = await usersBL.validate(password, user.password);
    }

    if (isMatch) {
      token = createToken(user);
    } else {
      throw err;
    }

    return res.send({
      data: { _id: user._id, email: user.email },
      token,
    });
  } catch (e) {
    throw e;
  }
}

async function forgotPassword (req, res, next) {
  const email = req.body.email;
  var result = await usersBL.forgotPassword(email);
  res.send({ data: result });
}

async function resetPassword (req, res, next) {
  var result = await usersBL.resetPassword(req.params.token);
  res.send({ data: result });
}

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
