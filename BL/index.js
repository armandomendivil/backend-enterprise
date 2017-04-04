
const DataDL = require('../DL/users');

class UsersBL extends DataDL {
  constructor (name) {
    super();
    this.name = name;
    this.dataDL = new DataDL(name);
  }

  async getAll () {
    const result = await this.dataDL.findAll();
    return result;
  }

  async getOne () {
    const result = await this.dataDL.findOne();
    return result;
  }
}

module.exports = UsersBL;
