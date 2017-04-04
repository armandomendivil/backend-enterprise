
/*
 * Module dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const cors = require('cors');
require('express-async-errors');

const config = require('./config');
const {
  logErrors,
  errorHandler,
  ensureAdminAuthenticated,
  ensureEnduserAuthenticated
} = require('../middlewares');

module.exports = () => {
  // Initialize express app
  const app = express();

  // Setting the app router and static folder
  app.use(express.static(path.resolve('./public')));
  app.set('view engine', 'jade');
  app.use('/scripts', express.static(path.resolve('./node_modules')));
  app.use(cors());
  // Middlewares - process between views and controller
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
  app.use(bodyParser.json());
  app.use(methodOverride());

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

  // Schedule routes
  config.getGlobbedFiles('./api/routes/cronjobs/**/*.js').forEach((routePath) => {
    /*eslint-disable */
    const route = require(path.resolve(routePath))(express);
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
