// middleware.js

const passport = require('passport');
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/config');
require('../config/passport')(passport);

/* eslint-disable */
exports.ensureAdminAuthenticated = function ensureAdminAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ code: 403, message: 'Your request has no authorization header.' });
  }

  const token = req.headers.authorization.split(' ')[1];
  let payload = {};
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  } catch (e) {
    var err = new Error();
    err.status = 403;
    err.message = 'Invalid token';
    throw err;
  }

  passport.authenticate('jwt', (err, data, info) => {
    if (payload.exp <= moment().unix() || !payload.exp) {
      return res
        .status(403)
        .send({ code: 403, message: 'Token expired.' });
    }
    next();
  })(req, res, next);
}

exports.logErrors = function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

exports.errorHandler = function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || 'Something went wrong';
  if (res.headersSent) {
    return next(err);
  }

  res.status(status);
  res.send({ error: message });
}
