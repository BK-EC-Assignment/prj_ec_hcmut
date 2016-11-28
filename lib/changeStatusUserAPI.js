var successResponse = require('../helper/parseSuccessResponse')
var errorResponse = require('../helper/parseErrorResponse')
var libMessage = require('../helper/constant')
var GError = require('../helper/Gerror').G_Error
var handle = require('../modules/changeStatusUser/handle.js')

module.exports = function () {
  this.add('role:api,cmd:changeStatus', changeStatus)
  this.act('role: web', {use: {
    prefix: '/api/users',
    pin: 'role:api, cmd: *',
    map: {
      changeStatus: {
        POST: true
      }
    }
  }})
}

function changeStatus (args, done) {
  var input = {
    token: args.fixedargs.req$.headers.token,
    email: args.email,
    done: done,
    errHandle: dbError,
    onSuccess: success,
    userNotExist: userNotExist,
  }
  handle(input)
}

function dbError (done) {
  done(null, errorResponse({}))
}

function userNotExist (done) {
  done(null, errorResponse(GError(libError.EMAIL_NOT_EXIST)))
}

function success (done, value) {
  var responseData = {
    response: {
      status: value
    }
  }
  done(null, successResponse(responseData))
}
