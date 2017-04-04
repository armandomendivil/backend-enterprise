// middleware.js
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/config');
/* eslint-disable */
exports.ensureAdminAuthenticated = function ensureAdminAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ code: 403, message: 'Your request has no authorization header.' });
  }

  const token = req.headers.authorization.split(' ')[1];
  const payload = jwt.decode(token, config.TOKEN_SECRET);

  if (payload.exp <= moment().unix()) {
    return res
      .status(403)
      .send({ code: 403, message: 'Token expired.' });
  } else if (payload.role !== 1) {
    return res
      .status(403)
      .send({ code: 403, message: 'Unauthorized access.' })
  }

  req.user = payload.sub;
  next();
}

exports.ensureEnduserAuthenticated = function ensureEnduserAdminAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ code: 403, message: 'Your request has no authorization header.' });
  }

  const token = req.headers.authorization.split(' ')[1];
  const payload = jwt.decode(token, config.TOKEN_SECRET);

  if (payload.exp <= moment().unix()) {
    return res
      .status(403)
      .send({ code: 403, message: 'Token expired.' });
  } else if (payload.id === 1) {
    return res
      .status(403)
      .send({ code: 403, message: 'Unauthorized access.' })
  }

  req.user = payload.sub;
  next();
}

exports.logErrors = function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

exports.errorHandler = function errorHandler(err, req, res, next) {

  if (err.status === 404) {
    res.status(404);
    res.send({ error: 'Route not found' });
  } else if (res.headersSent) {
    return next(err);
  }

  res.status(500);
  res.send({ error: 'Something went wrong' });
}

