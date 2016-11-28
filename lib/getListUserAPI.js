var successResponse = require('../helper/parseSuccessResponse')
var errorResponse = require('../helper/parseErrorResponse')
var libMessage = require('../helper/constant')
var GError = require('../helper/Gerror').G_Error
var handle = require('../modules/getListUser/getUserName.js')

module.exports = function () {
  this.add('role: api, cmd: listUser', getUsersList)
  this.act('role: web', {
    use: {
      prefix: '/api/users',
      pin: 'role: api, cmd: *',
      map: {
        listUser: {
          GET: true
        }
      }
    }
  })
}

function getUsersList (args, done) {
  var input = {
    token: args.req$.headers.token,
    done: done,
    onSuccess: success,
    error: error
  }
  handle(input)
}

function success (response, done) {
  done(null, successResponse({response: response}))
}

function error(done) {
  done(null, errorResponse(libMessage.error.INVALID_PARAMS))
}
