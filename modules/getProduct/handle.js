var database = require('./../../models/index').database
var GError = require('./../../helper/Gerror').G_Error
var libError = require('./../../helper/constant').error

module.exports = function (input) {
  return database.query('select from Product where status = true order by date asc')
    .then(function (response) {
      if (!response) {
        throw GError(libError.HANDLE_FAIL)
      }

      var products = []
      var now = Date.now()
      response.forEach(function (product) {
        var deadline = new Date(product.deadline*1000)
        var diff = new Date()
        var timeline = diff.setTime(deadline - now)
        var time = deadline.getDate() + '/' + (deadline.getMonth()+1) + '/' + deadline.getFullYear() +
                    ' ' + deadline.getHours() + ':' + deadline.getMinutes() + ':' + deadline.getSeconds()
        if (timeline > 0) {
          products.push({
            productId: product['@rid'],
            name: product.name,
            description: product.description,
            picture: product.picture,
            cost_min: product.cost_min,
            cost_expected: product.cost_expected,
            categories: product.categories,
            timeline: timeline,
            time: time,
            deadline: product.deadline
          })
        }
      })
      return {
        response: products
      }
    }).then(function (successData) {
      input.returnSuccessResponse(input.res, successData)
    }, function (error) {
      input.returnErrorResponse(input.res, error)
    })
}
