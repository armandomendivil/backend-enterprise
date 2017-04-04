const Environment = require('./environment');

class DataDL extends Environment {
  constructor (name) {
    super();
    this.name = name || '';
  }

  async findAll (query, params) {
    let name = this.name;
    const result = await this[name].find({}).limit(10).toArray();
    if (!result) {
      throw Error('Db find error');
    }

    return result;
  }
}

module.exports = DataDL;
