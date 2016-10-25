var handle = require('./../modules/changePassword/handle')
var successResponse = require('./../helper/parseSuccessResponse')
var errorResponse = require('./../helper/parseErrorResponse')
var libMessage = require('../helper/constant')

module.exports = function () {
  this.add('role: api, cmd: changePassword', changePassword)
  this.act('role: web', { use: {
    prefix: '/api/users',
    pin: 'role: api, cmd:*',
    map: {
      changePassword: {
        PUT: true
      }
    }
  }})
}

function changePassword (args, done) {
  var input = {
    token: args.token || null,
    oldpassword: args.oldpassword || null,
    newpassword: args.newpassword || null,
    confirm: args.confirm || null,
    done: done,
    errUser: errUser,
    errOld: errOld,
    errChange: notIdentical,
    onSuccess: success
  }

  handle(input)
}
function errUser (done) {
  done(null, errorResponse(libMessage.error.INVALID_TOKEN))
}

function errOld (done) {
  done(null, errorResponse(libMessage.error.INVALID_PASSWORD))
}

function notIdentical (done) {
  done(null, errorResponse(libMessage.error.MISSING_NEW_PASS))
}

function success (done) {
  done(null, successResponse(libMessage.success.SUCCESSFUL))
}
