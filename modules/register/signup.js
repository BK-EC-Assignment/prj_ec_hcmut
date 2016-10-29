var database = require('../../models/index.js').database
var crypto = require('crypto')
var randomGen = require('../../helper/RandomGen.js')
var encode = require('../../helper/Encoder.js')
var Promise = require('bluebird-extra')

module.exports = function (input) {
  return database.select().from('Users').where({
    email: input.email
  }).all()
    .then(function (value) {
        return insertData(input, value)
      })
}

function insertData (input, value) {
  if (value.length !== 0) {
    return input.userExist(input.done)
  } else {
    var newSalt = randomGen(8)
    var data = {
      username: input.username,
      email: input.email,
      phone: input.phone,
      salt: newSalt,
      password: crypto.createHmac('sha256', newSalt).update(input.password).digest('hex'),
      token: encode(input.email, newSalt),
      active: true,
      address: input.address,
      role: 'user'
    }
    return database.create('VERTEX', 'Users').set(data).one()
      .then(function (value) {
        if (value) {
          return input.onSuccess(input.done ,value)
        } else {
          return input.errHandle(input.done)
        }
      })
  }
}
