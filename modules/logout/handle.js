var database = require('./../../models/index').database
var GError = require('./../../helper/Gerror').G_Error
var libError = require('./../../helper/constant').error

module.exports = function (input) {
  return database.select().from('login').where({token: input.token, active: true}).one()
    .then(function (userLogin) {
      if (!userLogin) {
        throw GError(libError.INVALID_TOKEN)
      }
      return database.update('login').set({active: false}).where({token: input.token, active: true}).scalar()
        .then(function (user) {
          if (user) {
            return {
              response: {
                user: {
                  information: {
                    token: userLogin.token,
                    email: userLogin.email,
                    active: false
                  }
                }
              }
            }
          }
          throw GError(libError.HANDLE_FAIL)
        })
    }).then(function (successData) {
      input.returnSuccessResponse(input.done, successData)
    }, function (error) {
      input.returnErrorResponse(input.done, error)
    })
}
