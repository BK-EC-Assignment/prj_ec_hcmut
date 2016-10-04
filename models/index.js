var Oriento = require('oriento')
var models = {}
var orientDB = Oriento({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'bachkhoa'
})

var database = orientDB.use('ec-hcmut')

models.orientDB = orientDB
models.database = database
module.exports = models
