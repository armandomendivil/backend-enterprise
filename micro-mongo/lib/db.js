'use strict';

const Mongoose = require('mongoose');
require('mongoose-middleware').initialize(Mongoose);
require('./models')();

const config = require('../../config/config');

let db;

const defaults = config.db;

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
    this.ACL = {};
  }

  async connect () {
    let uri = this.getUri();
    this.initializeCollections();
    db = Mongoose.connect(uri);
    this.connected = true;
    return db;
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

  getUri () {
    // Default uri without credentials
    let uri = `mongodb://${this.host}:${this.port}/${this.db}`;

    // Validate if credentials exists
    if (this.username && this.password) {
      uri = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.db}`;
    }

    return uri;
  }

  async disconnect () {
    db.close();
  }
};

module.exports = Db;
