var database = require('../../models/index.js').database
var GError = require('./../../helper/Gerror').G_Error
var libMessage = require('./../../helper/constant')

module.exports = function (input) {
  return database.select().from('Login').where({
    token: input.token,
    active: true
  }).one()
    .then(function (user) {
      if (!user) {
        throw GError(libMessage.error.INVALID_ACCOUNT)
      }

      return database.select().from('Users').where({
        email: user.email,
        active: true
      }).one()
        .then(function (nameAuction) {
          return database.select().from('Product').where({
            '@rid': input.productID
          }).one()
            .then(function (product) {
              if (!product) {
                return input.notExitsProduct(input.done)
              }

              if (input.cost < product.cose_min) {
                return input.errorCost(input.done)
              }

              return database.create('EDGE', 'Auction').from(nameAuction['@rid']).to(product['@rid']).set({
                cost: input.cost,
                time: Math.floor(Date.now() / 1000)
              }).one()
                .then(function (auction) {
                  return input.onSuccess(input.done, input.cost)
                })
            })
        })
    })
}
