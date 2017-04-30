/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');
const pageComponents = fs.readdirSync(path.join(__dirname, '../../../api/controllers'));
const components = pageComponents;

function componentExists (comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
