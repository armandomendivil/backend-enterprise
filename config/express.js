
/*
 * Module dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const util = require('util');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config');
const {
  logErrors,
  errorHandler,
  ensureAdminAuthenticated,
  ensureEnduserAuthenticated,
} = require('../middlewares');

require('express-async-errors');

module.exports = () => {
  // Initialize express app
  const app = express();

  // Setting the app router and static folder
  app.use(express.static(path.resolve('./public')));
  app.set('view engine', 'pug');
  app.use('/scripts', express.static(path.resolve('./node_modules')));
  app.use(cors());
  // Middlewares - process between views and controller
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  app.use(morgan(function (tokens, req, res) {
    return util.inspect({ params: req.params, body: req.body }, false, null);
  }));

  app.use(passport.initialize());

  // Public routes
  config.getGlobbedFiles('./api/routes/public/**/*.js').forEach((routePath) => {
    /*eslint-disable */
    const route = require(path.resolve(routePath))(express);
    /*eslint-enable */
    app.use('/api', route);
  });

  // Admin routes
  config.getGlobbedFiles('./api/routes/enduser/**/*.js').forEach((routePath) => {
    /*eslint-disable */
    const route = require(path.resolve(routePath))(express);
    /*eslint-enable */
    app.use('/api/enduser', ensureEnduserAuthenticated, route);
  });

  // Admin routes
  config.getGlobbedFiles('./api/routes/admin/**/*.js').forEach((routePath) => {
    /*eslint-disable */
    const route = require(path.resolve(routePath))(express);
    /*eslint-enable */
    app.use('/api/admin', ensureAdminAuthenticated, route);
  });

  // Admin routes
  config.getGlobbedFiles('./api/routes/notFound.route.js').forEach((routePath) => {
    /*eslint-disable */
    const route = require(path.resolve(routePath))(express);
    /*eslint-enable */
    app.use(route);
  });

  app.use(logErrors);
  app.use(errorHandler);

  return app;
};
