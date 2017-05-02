const Environment = require('./environment');

/**
 * Reprents Data Layer
 * @constructor
 * @param {string} name - The name of the class
 */
class DataDL extends Environment {
  constructor (name) {
    super();
    this.name = name || '';
  }

  /**
   * Find all records with pagination
   * @param {Object} query - optional
   * @param {Object} params - Params to paginate
   * @param {Number} offset - Offset paginate
   * @param {Number} limit - Limite of records per page
   * @param {Object} fields - optional
   */
  async findAll (query = {}, params = {}, fields = {}) {
    const name = this.name;
    const offset = params.offset || 0;
    const limit = params.limit || 10;
    let result = {};

    // Get count of total records with query
    var count = await this[name].find(query).count();

    try {
      // Get records with query and pagination
      result = await this[name]
        .find(query, fields)
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: -1 });
    } catch (e) {
      throw e;
    }

    return {
      data: result,
      count,
    };
  }

  /**
   * Find one record
   * @param {Object} query - optional
   * @param {Object} fields - optional
   */
  async findOne (query = {}, fields = {}) {
    // Declare local variables
    const name = this.name;
    let result = {};

    try {
      // Get record with query
      result = await this[name].findOne(query, fields);
    } catch (e) {
      throw e;
    }

    return result;
  }

  /**
   * Save new document
   * @param {Objectt} document - required
   */
  async save (document) {
    try {
      const name = this.name;
      let result = {};
      const newDocument = new this[name](document);
      result = await newDocument.save();
      return result;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = DataDL;
