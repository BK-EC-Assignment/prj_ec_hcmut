var successResponse = require('./../helper/parseSuccessResponse')
var errorResponse = require('./../helper/parseErrorResponse')
var handle = require('./../modules/logout/handle')
var GError = require('../helper/Gerror').G_Error
var libMessage = require('../helper/constant')

module.exports = function () {
  this.add('role: api, cmd: logout', logoutHandle)
  this.act('role: web', {use: {
    prefix: '/api/users',
    pin: 'role: api, cmd: *',
    map: {
      logout: {
        POST: true
      }
    }
  }})
}

function logoutHandle (args, done) {
  var input = {
    token: args.req$.body.token,
    done: done,
    returnSuccessResponse: returnSuccessResponse,
    returnErrorResponse: returnErrorResponse
  }
  if (!input.token) {
    done(null, errorResponse(GError(libMessage.error.INVALID_PARAMS)))
  } else {
    handle(input)
  }
}

function returnSuccessResponse (done, response) {
  done(null, successResponse(response))
}

function returnErrorResponse (done, response) {
  done(null, errorResponse(response))
}
