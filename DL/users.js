
const Base = require('./base');

class User extends Base {
  constructor () {
    super();
    this.name = 'Users';
    this.init();
  }

  async init () {
    if (!this.name) throw Error('Collection name is required');
    await this.connect();
  }
}

module.exports = User;
