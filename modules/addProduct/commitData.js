var database = require('../../models/index.js').database
var fs = require('fs')

module.exports = function (input, fields, files) {
  if ((fields.name) && (files.picture) && (fields.description)) {
    var path = files.picture.path
    var data = {
      time: fields.time,
      description: (fields.description) ? fields.description : '',
      status: true,
      name: fields.name,
      picture: path.substring(path.indexOf('/uploads/')),
      categories: fields.categories,
      cost_min: fields.cost_min,
      cost_expected: fields.cost_expected
    }
    return database.create('VERTEX', 'Product').set(data).one()
      .then(
        function (value) {
          return input.success(input.done)
        },
        function () {
          return input.errHandle(input.done)
        })
  } else {
    if (fields.picture) {
      fs.unlink(fields.picture.path, function () {})
    }
    return input.invailid(input.done)
  }
}
