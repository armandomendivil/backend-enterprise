'use strict';

const Mongoose = require('mongoose');
require('mongoose-middleware').initialize(Mongoose);
require('./models')(); // Initialize schemas

Mongoose.Promise = require('bluebird');
const config = require('../../config/config');

let db;
const defaults = config.db;

// Connect to mongo db
Mongoose.connect(defaults.MONGO_URL);

class Db {
  constructor (options) {
    options = options || {};
    this.host = options.host || defaults.host;
    this.port = options.port || defaults.port;
    this.username = options.username || defaults.username;
    this.password = options.password || defaults.password;
    this.db = options.db || defaults.db;
    this.connected = false;
    this.setup = options.setup || false;
  }

  async connect () {
    try {
      this.initializeCollections();
      this.connected = true;
      return db;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Initialize all collections that we need
   */
  async initializeCollections () {
    const self = {};
    const models = Mongoose.connections[0].models;
    Object.keys(models).forEach((model) => {
      self[model] = Mongoose.model(model);
    });

    // Merge self object with this
    Object.assign(this, self);
  }

  async disconnect () {
    db.close();
  }
};

module.exports = Db;
