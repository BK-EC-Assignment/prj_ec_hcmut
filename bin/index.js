var http = require('http')
var app = require('./../src/app')
var models = require('./../models')
var server = http.createServer(app)

var boot = function () {
  server.listen(app.get('port'), function () {
    console.info('Express server listening on port ' + app.get('port'))

    models.orientDB.list().then(function () {
      console.info('Connect to database successful')
    }).catch(function (error) {
      console.info('Connect fail!' + error)
    })
  })
}

var shutdown = function () {
  server.close()
}
if (require.main === module) {
  boot()
} else {
  console.info('Running app as module')
  exports.boot = boot
  exports.shutdown = shutdown
  exports.port = app.get('port')
}
