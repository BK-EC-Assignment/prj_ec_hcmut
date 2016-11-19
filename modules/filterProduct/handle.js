var database = require('./../../models/index').database
var GError = require('./../../helper/Gerror').G_Error
var libError = require('./../../helper/constant').error

module.exports = function (input) {
  var sql = "select * from Product where categories = " + "'" + input.category + "'"
  return database
          .query(sql)
          .then(function (product) {
            if (!product) {
              throw GError(libError.HANDLE_FAIL)
            }

            var products = []
            product.forEach(function (list) {
              products.push({
                productId: list['@rid'],
                name: list.name,
                description: list.description,
                picture: list.picture,
                cost_min: list.cost_min,
                cost_expected: list.cost_expected,
                categoties: list.categoties,
                deadline: list.deadline
              })
            })

            return {
              response: products
            }
          })
          .then(function (successData) {
            input.onSuccess(input.done, successData)
          }, function (error) {
            input.error(input.done, error)
          })
}
