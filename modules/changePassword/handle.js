var database = require('./../../models/index').database
var crypto = require('crypto')
module.exports = function (input) {
  return database.select().from('Login').where({
    token: input.token,
    active: 'true'
  }).one()
    .then(function (login) {
      if (login) {
        database.select().from('Users').where({
          email: login.email
        }).one()
          .then(function (user) {
            var oldpassword = crypto.createHmac('sha256', user.salt).update(input.oldpassword).digest('hex')
            if (oldpassword !== user.password) {
              input.errOld(input.done)
            } else if (input.newpassword !== input.confirm) {
              input.errChange(input.done)
            } else {
              database.update('Users').set({
                password: crypto.createHmac('sha256', user.salt).update(input.newpassword).digest('hex'),
                active: 'true'
              }).where({
                email: login.email
              }).scalar()
                .then(function () {
                  input.onSuccess(input.done)
                })
            }
          })
      } else {
        input.errUser(input.done)
      }
    })
}
