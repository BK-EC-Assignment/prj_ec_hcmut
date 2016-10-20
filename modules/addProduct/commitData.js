var database = require('../../models/index.js').database
var fs = require('fs')

module.exports = function (input, fields, files) {
  if ((fields.name) && (files.picture) && (fields.description) && (fields.date)) {
    var path = files.picture.path
    var oneDay = 24*60*60*1000
    var date = new Date(fields.date)
    var now = new Date()
    console.log(date)
    console.log(now)
    var data = {
      date: fields.date,
      numDay: Math.round(Math.abs((date.getTime() - now.getTime())/(oneDay))),
      description: (fields.description) ? fields.description : '',
      status: true,
      name: fields.name,
      picture: path.substring(path.indexOf('/uploads/')),
      categories: fields.categories,
      cost_min: fields.cost_min,
      cost_expected: fields.cost_expected
    }
    console.log(data)
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
