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
      var date = new Date(now)
      var year = date.getFullYear()
      var month = date.getMonth()
      var day = date.getDate()
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var second = date.getSeconds()
      response.forEach(function (product) {
        var deadline = new Date(product.deadline*1000)
        var y = deadline.getFullYear()
        var m = deadline.getMonth()
        var d = deadline.getDate()
        var h = deadline.getHours()
        var mi = deadline.getMinutes()
        var s = deadline.getSeconds()
        var dayNow = Math.round(Math.abs((y-year))) + '-' + Math.round(Math.abs((month-m))) + '-' + Math.round(Math.abs((d-day))) + ' ' + Math.round(Math.abs((h-hours))) + ':'  + Math.round(Math.abs((mi-minutes))) + ':' + Math.round(Math.abs((s-second)))
        console.log(dayNow)
        products.push({
          productId: product['@rid'],
          name: product.name,
          description: product.description,
          picture: product.picture,
          cost_min: product.cost_min,
          cost_expected: product.cost_expected,
          categoties: product.categoties,
          deadline: dayNow
        })
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
