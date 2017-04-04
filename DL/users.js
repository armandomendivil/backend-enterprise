
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

  async findOne (query, params) {
    let name = this.name;
    console.log(name);
    const result = await this[name].findOne({});
    if (!result) {
      throw Error('Db find error');
    }

    return result;
  }
}

module.exports = User;
