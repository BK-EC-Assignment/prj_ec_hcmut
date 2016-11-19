var successResponse = require('../helper/parseSuccessResponse')
var errorResponse = require('../helper/parseErrorResponse')
var libMessage = require('../helper/constant')
var GError = require('../helper/Gerror').G_Error
var filterProduct = require('./../modules/filterProduct/handle.js')

module.exports = function () {
  this.add('role: api, cmd: category', handleCategory)
  this.act('role: web', {use: {
    prefix: '/api/users',
    pin: 'role: api, cmd: *',
    map: {
      category: {
        GET: true
      }
    }
  }})
}

function handleCategory (args, done) {
  var input = {
    category: args.req$.query.category,
    onSuccess: success,
    error: error,
    done: done
  }
  filterProduct(input)
}

function success (done, response) {
  done(null, successResponse(response))
}

function error(done, response) {
  done(null, errorResponse(response))
}
