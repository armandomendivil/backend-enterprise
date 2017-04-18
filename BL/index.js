
const DataDL = require('../DL/users');

class UsersBL extends DataDL {
  constructor (name) {
    super();
    this.name = name;
    this.dataDL = new DataDL(name);
  }

  /**
   * Get all users
   * @param {object} query - The query parameters
   * @param {string} query.search - Search for multiple fields
   * @param {object} pagination - The pagination paramaters
   * @param {number} pagination.limit - The pagination limit
   * @param {number} pagination.offset - The pagination offset
   * @return {array} users
   */
  async getAll (query, pagination) {
    const result = await this.dataDL.findAll(query, pagination);
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
