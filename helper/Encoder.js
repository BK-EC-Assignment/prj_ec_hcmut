var crypto = require('crypto')

module.exports = function (data, salt = 'secret') {
  return crypto.createHash('sha256').update(data + salt).digest('hex')
}
