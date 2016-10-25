var successResponse = require('../helper/parseSuccessResponse')
var errorResponse = require('../helper/parseErrorResponse')
var libMessage = require('../helper/constant')
var GError = require('../helper/Gerror').G_Error
var auction = require('./../modules/auction/handle.js')

module.exports = function () {
  this.add('role: api, cmd: auction', handleAuction)
  this.act('role: web', {use: {
    prefix: '/api/users',
    pin: 'role: api, cmd: *',
    map: {
      auction: {
        POST: true
      }
    }
  }})
}

function handleAuction (args, done) {
  var input = {
    token: args.req$.headers.token,
    cost: args.req$.body.cost,
    productID: args.req$.body.productID,
    onSuccess: success,
    errHandle: dbError,
    notExitsProduct: notExitsProduct,
    errorCost: errorCost,
    done: done
  }
  auction(input)
}

function success (done, cost) {
  done(null, successResponse({response: {cost: cost}}))
}


function dbError (done) {
  done (null, errorResponse(libMessage.error.EMAIL_INVALID))
}

function notExitsProduct (done) {
  done(null, errorResponse(libError.error.MISSING_PRODUCT))
}

function errorCost(done) {
  done(null, errorResponse(libError.error.MISSING_COST))
}
