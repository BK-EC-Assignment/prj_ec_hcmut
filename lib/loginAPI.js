var successResponse = require('../helper/parseSuccessResponse')
var errorResponse = require('../helper/parseErrorResponse')
var libMessage = require('../helper/constant')
var GError = require('../helper/Gerror').G_Error
var signin = require('./../modules/login/signin.js')

module.exports = function () {
  this.add('role: api, cmd: login', login)
  this.act('role: web', {use: {
    prefix: '/api/users',
    pin: 'role: api, cmd: *',
    map: {
      login: {
        POST: true
      }
    }
  }})
}

function login (args, done) {
  var input = {
    email: args.email || null,
    password: args.password || null,
    onSuccess: success,
    errHandle: dbError,
    errPass: passError,
    done: done
  }
  signin(input)
}

function dbError (done) {
  done (null, errorResponse(libMessage.error.EMAIL_INVALID))
}

function passError (done) {
  done (null, errorResponse(libMessage.error.PASSWORD_INVALID))
}

function success (done, value) {
  done (null, successResponse(value))
}
