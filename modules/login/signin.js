var database = require('../../models/index.js').database
var crypto = require('crypto')
var randomGen = require('../../helper/RandomGen.js')
var encode = require('../../helper/Encoder.js')
var Promise = require('bluebird-extra')
var GError = require('./../../helper/Gerror').G_Error
var libMessage = require('./../../helper/constant')
var randomString = require('randomstring')

module.exports = function (input) {
  return database.select().from('Users').where({
    email: input.email,
    active: true
  }).one()
    .then(function (user) {
      if (!user) {
        throw GError(libMessage.error.INVALID_ACCOUNT)
      }
      if (user.password === crypto.createHmac('sha256', user.salt).update(input.password).digest('hex')) {
        let secretKey = randomString.generate()
        let login = {
          email: user.email,
          active: true,
          token: crypto.createHmac('sha256', secretKey)
            .update(user.email)
            .digest('hex')
        }

        let payload = {
          userID: user['@rid'],
          role: user.role
        }
        return {
          login: login,
          payload: payload
        }
      }
      throw GError(libMessage.error.INVALID_ACCOUNT)
    })
    .then(function (data) {
      return database.insert().into('Login').set(data.login).one()
        .then(function (dataLogin) {
          let payload = data.payload
          payload.loginID = dataLogin['@rid']
          let user = {
            token: data.login.token,
            email: data.login.email
          }
          return {
            user: user,
            payload: payload
          }
          throw GError(libMessage.error.HANDLE_FAIL)
        })
    })
    .then(function (data) {
      return database.create('EDGE', 'haslogin').from(data.payload.userID).to(data.payload.loginID).one()
        .then(function (dataUser) {
          return data
        })
        throw GError(libMessage.error.HANDLE_FAIL)
    })
    .then(function (data) {
      if (data) {
      return {
        response: {
          user: {
            information: {
              role: data.payload.roleUser,
              token: data.user.token,
              email: data.user.email,
              active: true,
              username: data.payload.username,
            }
          }
        }
      }
    }
    throw GError(libMessage.error.HANDLE_FAIL)
  }).then(function (successData) {
      input.onSuccess(input.done, successData)
    }, function (error) {
      input.errHandle(input.done)
    })
}
