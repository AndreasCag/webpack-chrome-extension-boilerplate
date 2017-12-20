const path = require('path');

module.exports = function resolve(...pathTo) {
  return path.join(__dirname, '..', ...pathTo);
};