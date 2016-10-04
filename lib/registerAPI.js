var signup = require('../modules/register/signup.js')
var successResponse = require('../helper/parseSuccessResponse')
var errorResponse = require('../helper/parseErrorResponse')
var libMessage = require('../helper/constant')
var GError = require('../helper/Gerror').G_Error

module.exports = function () {
  this.add('role: api, cmd: register', register)
  this.act('role: web', {use: {
    prefix: '/api/users',
    pin: 'role: api, cmd: *',
    map: {
      register: {
        POST: true
      }
    }
  }})
}

function register (args, done) {
  var input = {
    email: args.email,
    username: args.username,
    password: args.password,
    address: args.address,
    done: done,
    userExist: userExist,
    onSuccess: success,
    errHandle: dbError
  }
  signup(input)
}

function userExist (done) {
  done (null, errorResponse(libMessage.error.EMAIL_EXIST))
}

function dbError (done) {
  done (null, errorResponse(libMessage.error.ERROR_DATA))
}

function success (done, value) {
  var responseData = {
    response: {
      user: {
        information: {
          email: value.email,
          token: value.token
        }
      }
    }
  }
  done (null, successResponse(responseData))
}
