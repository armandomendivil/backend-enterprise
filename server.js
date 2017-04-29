
/*
 * Module dependencies
 */
const http = require('http');
const init = require('./config/env/init');

init();
const config = require('./config/config');
const express = require('./config/express');

// Init the express application
const app = express();
const server = http.createServer(app);

// Server listen
server.listen(config.SERVER_PORT, () => {
  console.log(`Server listen on PORT: ${config.SERVER_PORT}`);
});

// Expose app
exports = module.exports = app;
