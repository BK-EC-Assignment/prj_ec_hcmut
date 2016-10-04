function Gerror (error) {
  this.code = error.code || 500
  this.message = error.message || ''
}
Gerror.prototype = Error.prototype

var getError = function (error) {
  return new Gerror(error)
}

exports.G_Error = getError
