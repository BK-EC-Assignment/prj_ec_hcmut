var successResponse = require('../helper/parseSuccessResponse')
var errorResponse = require('../helper/parseErrorResponse')
var libMessage = require('../helper/constant')
var GError = require('../helper/Gerror').G_Error
var getUserAuction = require('./../modules/getUserAuction/handle.js')

module.exports = function () {
  this.add('role: api, cmd: getAuction', handleUserAuction)
  this.act('role: web', {use: {
    prefix: '/api/users',
    pin: 'role: api, cmd: *',
    map: {
      getAuction: {
        GET: true
      }
    }
  }})
}

function handleUserAuction (args, done) {
  var input = {
    id: args.req$.headers.id,
    onSuccess: success,
    error: error,
    done: done
  }
  getUserAuction(input)
}

function success (done, response) {
  done(null, successResponse(response))
}

function error(done, response) {
  done(null, errorResponse(response))
}
