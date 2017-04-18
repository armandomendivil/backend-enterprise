
const { createToken } = require('../helpers');
const UsersBL = require('../../BL');
const usersBL = new UsersBL();

/**
 * Register user
 * @param {string} [email] - The user's email
 * @param {string} password - The user's password
 * @return {string} token - The user's token
 */
async function register (req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, msg: 'Error please enter your email and password' });
  } else {
    try {
      const newUser = {
        email: req.body.email,
        password: req.body.password,
      };

      var result = await usersBL.save(newUser);
      return res.send({ data: result });
    } catch (e) {
      throw Error(e);
    }
  }
}

async function login (req, res, next) {
  const { email, password } = req.body;
  let user = {};
  let query = { email: email };
  let token;

  try {
    user = usersBL.findOne(query);
    if (!user) return res.status(403).send({ success: false, msg: 'authentication false :/' });

    let isMatch = usersBL.comparePassword(password);
    if (isMatch) {
      token = createToken(user);
    } else {
      return res.status(403).send({ success: false, msg: 'authentication, wrong password' });
    }
  } catch (e) {
    throw Error(e);
  }

  return res.send({ data: token });
}

module.exports = {
  register,
  login,
};
