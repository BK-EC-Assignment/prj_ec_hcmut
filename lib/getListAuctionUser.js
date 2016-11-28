var successResponse = require('../helper/parseSuccessResponse')
var errorResponse = require('../helper/parseErrorResponse')
var libMessage = require('../helper/constant')
var GError = require('../helper/Gerror').G_Error
var handle = require('./../modules/getListProductAuction/handle.js')

module.exports = function () {
  this.add('role: api, cmd: getAuctionUser', handleUserAuction)
  this.act('role: web', {use: {
    prefix: '/api/users',
    pin: 'role: api, cmd: *',
    map: {
      getAuctionUser: {
        GET: true
      }
    }
  }})
}

function handleUserAuction (args, done) {
  var input = {
    email: args.req$.headers.email,
    onSuccess: success,
    error: error,
    done: done
  }
  handle(input)
}

function success (done, response) {
  done(null, successResponse(response))
}

function error(done, response) {
  done(null, errorResponse(response))
}
