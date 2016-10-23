var successResponse = require('../helper/parseSuccessResponse')
var errorResponse = require('../helper/parseErrorResponse')
var libMessage = require('../helper/constant')
var GError = require('../helper/Gerror').G_Error
var handle = require('./../modules/detailProduct/handle.js')

module.exports = function () {
  this.add('role: api, cmd: detail', handleDetail)
  this.act('role: web', {use: {
    prefix: '/api/product',
    pin: 'role: api, cmd: *',
    map: {
      detail: {
        GET: true
      }
    }
  }})
}

function handleDetail (args, done) {
  var input = {
    id: args.req$.query.id,
    onSuccess: success,
    errHandle: dbError,
    done: done
  }

  handle(input)
}

function success (done, data) {
  done(null, successResponse({response: {data}}))
}

function dbError (done) {
  done (null, errorResponse(libMessage.error.HANDLE_FAIL))
}
