
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

  async comparePassword (password) {
    const name = this.name;
    let result = {};

    try {
      result = await this[name].comparePassword(password);
    } catch (e) {
      throw Error(e);
    }

    return result;
  }
}

module.exports = User;
