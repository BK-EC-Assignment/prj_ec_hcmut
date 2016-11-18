var database = require('./../../models/index').database
var GError = require('./../../helper/Gerror').G_Error
var libError = require('./../../helper/constant').error

module.exports = function (input) {
  var sql = "select out.username as username, time from Auction where in = " + input.id;
  return database
          .query(sql)
          .then(function (list) {
            if (!list) {
              throw GError(libError.HANDLE_FAIL)
            }

            var listAuction = []
            list.forEach(function (auction) {
              var timeAuction = new Date(auction.time*1000)
              var time = timeAuction.getDate() + '/' + (timeAuction.getMonth()+1) + '/' + timeAuction.getFullYear() +
                          ' ' + timeAuction.getHours() + ':' + timeAuction.getMinutes() + ':' + timeAuction.getSeconds()
              listAuction.push({
                username: auction.username,
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
