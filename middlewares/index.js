// middleware.js

const passport = require('passport');
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/config');
require('../config/passport')(passport);

/* eslint-disable */
exports.ensureAdminAuthenticated = function ensureAdminAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    var err = new Error();
    err.status = 403;
    err.name = 'NoAuthorizationHeader';
    throw err;
  }

  const token = req.headers.authorization.split(' ')[1];
  let payload = {};
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);

    passport.authenticate('jwt', (err, data, info) => {
      if (payload.exp <= moment().unix() || !payload.exp) {
        var err = new Error();
        err.status = 403;
        err.name = 'InvalidToken';
        throw err;
      }
      next();
    })(req, res, next);
  } catch (e) {
    e.status = 403;
    e.name = 'InvalidToken';
    throw e;
  }
}

exports.logErrors = function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

exports.errorHandler = function errorHandler(err, req, res, next) {
  // Default values
  let status = err.status || 500;
  let message = 'Something went wrong';

  if (res.headersSent) {
    return next(err);
  }

  if (err) {
    switch (err.name) {
      case 'ValidationError':
        for (var field in err.errors) {
          message = err.errors[field].message;
        }
        break;
      case 'InvalidToken':
        message = 'Invalid token.';
        break;
      case 'AuthenticationFailed':
        message = 'Authentication failed.';
        break;
      case 'NoAuthorizationHeader':
        message = 'Your request has no authorization header.';
        break;
      case 'TokenExpired':
        message = 'Token expired.';
        break;
    }
  }

  res.status(status);
  res.send({ error: message });
}
