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
      response.forEach(function (product) {
        products.push({
          productId: product['@rid'],
          name: product.name,
          description: product.description,
          picture: product.picture,
          cost_min: product.cost_min,
          cost_expected: product.cost_expected,
          categoties: product.categoties,
          numDay: product.numDay
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
