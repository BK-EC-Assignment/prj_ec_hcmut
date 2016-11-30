var database = require('./../../models/index').database
var GError = require('./../../helper/Gerror').G_Error
var libMessage = require('./../../helper/constant')

module.exports = function (input) {
  var sql = 'select * from Product where name like "%' + input.keyword + '%"'
  return database.query(sql)
    .then(function (result) {
      var list = []
      result.forEach(function (product) {
        list.push({
          productId: product['@rid'],
          name: product.name,
          description: product.description,
          picture: product.picture,
          cost_min: product.cost_min,
          cost_expected: product.cost_expected,
          categories: product.categories,
          deadline: product.deadline
        })
      })
      return {
        response: list
      }
    }).then(function (successData) {
      input.resSuccess(input.done, successData)
    })
}
