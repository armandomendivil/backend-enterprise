
const MongoClient = require('mongodb').MongoClient;
const config = require('../config/config');
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
  }

  async connect () {
    let uri = this.getUri();
    console.log(this.getUri());
    db = await MongoClient.connect(uri);
    this.connected = true;
    this.initializeCollections();
    return db;
  }

  /**
   * Initialize all collections that we need
   */
  async initializeCollections () {
    this.Users = db.collection('users');
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
