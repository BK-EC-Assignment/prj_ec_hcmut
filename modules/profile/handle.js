var database = require('./../../models/index').database
var GError = require('./../../helper/Gerror').G_Error
var libError = require('./../../helper/constant')

module.exports = function (input) {
  return database.select().from('Login').where({
    token: input.token,
    active: true
  }).one()
    .then(function (user) {
      if (!user) {
        throw GError(libError.error.ERROR_DATA)
      }

      return database.select().from('Users').where({
        email: user.email
      }).one()
        .then(function (profile) {
          if (!profile) {
            throw GError(libError.error.EMAIL_INVALID)
          }
          
          return {
            response:{
              user: {
                information:{
                  email: profile.email,
                  username: profile.username,
                  phone: profile.phone,
                  address: profile.address
                }
              }
            }
          }
        })
        .then(function (userInfo) {
          console.log(userInfo)
          input.returnSuccessResponse(input.done, userInfo)
        }, function (error) {
          input.returnErrorResponse(input.done)
        })
    })
}
