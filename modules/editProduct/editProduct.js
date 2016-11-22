var fs = require('fs')
var database = require('./../../models/index.js').database
var GError = require('./../../helper/Gerror').G_Error
var libMessage = require('./../../helper/constant')
var pathImages = require('path')

module.exports = function (input, fields, files) {
  var dirFile = ''
  var path = ''
  if ((fields.name) && (files.picture) && (fields.categories) && (fields.cost_min) && (fields.cost_expected) && (fields.deadline)) {
    return database.select().from('Product').where(
      '@rid =' + fields.productId
    ).one()
      .then(function (product) {
        if (!product) {
          throw GError(libMessage.error.MISSING_PRODUCT)
        }

        dirFile = pathImages.join(__dirname, '/../../public/' + product.picture)
        if (files.picture) {
          path = files.picture.path
          fs.unlinkSync(dirFile)
        } else {
          path = dirFile
        }

        return database.update('Product').set({
          name: fields.name,
          description: (fields.description) ? fields.description : '',
          picture: path.substring(path.indexOf('/uploads/')),
          deadline: fields.deadline,
          cost_min: fields.cost_min,
          cost_expected: fields.cost_expected,
          categories: fields.categories
        }).where(
          '@rid = ' + fields.productId
        ).scalar()
         .then(function (value) {
           return input.success(input.done)
         }, function () {
           return input.errHandle(input.done)
         })
      })
  } else {
    if (files.picture) {
      fs.unlink(files.picture.path, function () {})
    }
    return input.invailid(input.done)
  }
}
