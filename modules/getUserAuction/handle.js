var database = require('./../../models/index').database
var GError = require('./../../helper/Gerror').G_Error
var libError = require('./../../helper/constant').error

module.exports = function (input) {
  var sql = "select out.username as name, time from Auction where in = " + input.id;
  return database
          .query(sql)
          .then(function (list) {
            if (!list) {
              throw GError(libError.HANDLE_FAIL)
            }

            var listAuction = []
            list.forEach(function (auction) {
              var time = new Date(auction.time*1000)
              listAuction.push({
                name: auction.name,
                time: time
              })
            })
            return {
              response: listAuction
            }
          })
          .then(function (successData) {
            input.onSuccess(input.done, successData)
          }, function (error) {
            input.error(input.done, error)
          })
}
