var successResponse = require('./../helper/parseSuccessResponse')
var errorResponse = require('./../helper/parseErrorResponse')
var handle = require('./../modules/profile/handle')
var GError = require('../helper/Gerror').G_Error
var libMessage = require('../helper/constant')

module.exports = function () {
  this.add('role: api, cmd: profile', profileHandle)
  this.act('role: web', {use: {
    prefix: '/api/users',
    pin: 'role: api, cmd: *',
    map: {
      profile: {
        GET: true
      }
    }
  }})
}

function profileHandle (args, done) {
  var input = {
    token: args.req$.headers.token,
    done: done,
    returnSuccessResponse: returnSuccessResponse,
    returnErrorResponse: returnErrorResponse
  }
  handle(input)
}

function returnSuccessResponse (done, value) {
  done (null, successResponse(value))
}


function returnErrorResponse (done, response) {
  done(null, errorResponse(response))
}
