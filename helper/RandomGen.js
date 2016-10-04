var rndStr = require('randomstring')

module.exports = function (length = 8) {
  return rndStr.generate((length > 0) ? length : 1)
}
