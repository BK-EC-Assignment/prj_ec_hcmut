var database = require('./../../models/index').database
var GError = require('./../../helper/Gerror').G_Error
var libError = require('./../../helper/constant').error

module.exports = function (input) {
  return database.query('select max(cost) as cost from Auction where out.email = ' + '"' + input.email + '"')
    .then(function (cost) {
      let maxCost = []
      cost.forEach(function (costAuction) {
        maxCost.push({
          cost: costAuction.cost
        })
      })
      var maxAuction = maxCost[0].cost
      var sql = 'select in.picture as picture, in.name as name, in.categories as category, in.deadline as time from Auction where out.email = ' + '"' + input.email + '"' + 'and cost = ' + '"' + maxAuction + '"';
      return database.query(sql)
        .then(function (auction) {
          if (!auction) {
            throw GError(libError.HANDLE_FAIL)
          }
          return {
            response: auction,
          }
        })
    }).then(function (successData) {
      input.onSuccess(input.done, successData)
    }, function (error) {
      input.error(input.done, error)
    })
}
