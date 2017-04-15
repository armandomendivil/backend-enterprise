
const DataDL = require('../DL/users');

class UsersBL extends DataDL {
  constructor (name) {
    super();
    this.name = name;
    this.dataDL = new DataDL(name);
  }

  async getAll (query, params) {
    const result = await this.dataDL.findAll(query, params);
    return result;
  }

  async getOne () {
    const result = await this.dataDL.findOne();
    return result;
  }

  async save (document) {
    const result = await this.dataDL.save(document);
    return result;
  }

  async comparePassword (password) {
    const result = await this.dataDL.comparePassword(password);
    return result;
  }
}

module.exports = UsersBL;
