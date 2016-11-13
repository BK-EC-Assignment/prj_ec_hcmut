var database = require('./../../models/index').database
var GError = require('./../../helper/Gerror').G_Error
var libMessage = require('./../../helper/constant')

module.exports = function (input) {
  return database.select().from('Product').where({
    '@rid': '#13:' + input.id
  }).one()
    .then(function (detail) {
      if (!detail) {
        throw GError(libMessage.HANDLE_FAIL)
      }

      var data = {
        productId: detail['@rid'],
        name: detail.name,
        description: detail.description,
        picture: detail.picture,
        cost_min: detail.cost_min,
        cost_expected: detail.cost_expected,
        categories: detail.categories,
        deadline: detail.deadline
      }
      return {
        data: data
      }
    }).then(function (successData) {
      input.onSuccess(input.done, successData)
    }, function (error) {
      input.errHandle(input.done)
    })
}
