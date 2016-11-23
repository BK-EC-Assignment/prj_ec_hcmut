var database = require('./../../models/index').database
var GError = require('./../../helper/Gerror').G_Error
var libMessage = require('./../../helper/constant')

module.exports = function (input) {
  return database.select()
    .from('Login').where({
      token: input.token,
      active: true
    }).one()
      .then(function (userLogin) {
        return database.select().from('Users').where({
          email: userLogin.email
        }).one()
        .then(function (user) {
          if (!user) {
            throw GError(libMessage.error.INVALID_TOKEN)
          }
          if (user.role !== 'admin') {
            throw GError(libMessage.error.INVALID_PERMISSION)
          }
          return database.select().from('Product').where(
            '@rid = ' + input.productId
          ).one()
        }).then(function (product) {
          if (!product) {
            throw GError(libMessage.error.MISSING_PRODUCT)
          }
          return database.update('Product').set({
            status: false
          }).where('@rid = ' + input.productId)
            .scalar()
        }).then(function (data) {
          if (!data) {
            throw GError(libMessage.error.HANDLE_FAIL)
          }
          return {
            message: libMessage.success.SUCCESSFUL.message
          }
        }).then(function (success) {
          input.returnSuccessResponse(input.res, success)
        }, function (error) {
          input.returnErrorResponse(input.res, error)
        })
      })
}
