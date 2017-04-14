
const path = require('path');
const config = require('../../../config/config');

module.exports = () => {
  // Globbing model files
  config.getGlobbedFiles('./micro-mongo/lib/models/**/*.js').forEach((modelPath) => {
    const excludeFile = 'index.js';
    if (path.basename(modelPath) !== excludeFile) {
      require(path.resolve(modelPath));
    }
  });
};
