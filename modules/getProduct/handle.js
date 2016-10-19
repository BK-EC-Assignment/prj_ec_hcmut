var database = require('./../../models/index').database
var GError = require('./../../helper/Gerror').G_Error
var libError = require('./../../helper/constant').error

module.exports = function (input) {
  return database.select('expand(first(in("haslogin")))').from('Login').where({
    token: input.token,
    active: true
  }).one()
    .then(function (user) {
      if (!user) {
        throw GError(libError.INVALID_TOKEN)
      }
      return database.query('select from Product where status = true order by time desc')
    }).then(function (response) {
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
          categoties: product.categoties
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
