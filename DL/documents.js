
const Base = require('./base');

class Document extends Base {
  constructor () {
    super();
    this.name = 'Documents';
    this.init();
  }

  async init () {
    if (!this.name) throw Error('Collection name is required');
    await this.connect();
  }
}

module.exports = Document;
