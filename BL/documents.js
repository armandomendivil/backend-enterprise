
const DataDL = require('../DL/documents');

class UsersBL extends DataDL {
  constructor (name) {
    super();
    this.name = name;
    this.dataDL = new DataDL(name);
  }

  /**
   * Get all documents
   * @param {object} query - The query parameters
   * @param {string} query.search - Search for multiple fields
   * @param {object} pagination - The pagination paramaters
   * @param {number} pagination.limit - The pagination limit
   * @param {number} pagination.offset - The pagination offset
   * @return {array} users
   */
  async findAll (query, pagination) {
    const result = await this.dataDL.findAll(query, pagination);
    return result;
  }

  async findOne (query = { isActive: true }, fields = { _id: 1, name: 1 }) {
    const result = await this.dataDL.findOne(query, fields);
    return result;
  }

  async save (document) {
    const result = await this.dataDL.save(document);
    return result;
  }
}

module.exports = UsersBL;
