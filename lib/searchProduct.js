var successResponse = require('./../helper/parseSuccessResponse')
var search = require('./../modules/searchProduct/search')

module.exports = function () {
  this.add('role: api, cmd: search', searchProduct)
  this.act('role: web', { use: {
    prefix: '/api/users',
    pin: 'role: api, cmd: *',
    map: {
      search: {
        POST: true
      }
    }
  }})
}

function searchProduct (args, done) {
  var input = {
    token: args.req$.headers.token || null,
    keyword: args.req$.body.keyword || null,
    resSuccess: resSuccess,
    done: done
  }
  search(input)
}

function resSuccess (done, response) {
  done(null, successResponse({response: response}))
}
