var path = require('path')
var formidable = require('formidable')
var errorResponse = require('../../helper/parseErrorResponse')
var successResponse = require('../../helper/parseSuccessResponse')
var handle = require('./handle.js')
var libError = require('../../helper/constant').error
var GError = require('../../helper/Gerror').G_Error

module.exports = function (req, res) {
  var input = {
    token: req.headers.token,
    errHandle: dbError,
    invailid: invailidData,
    success: success,
    done: res,
    res: res,
    req: req
  }
  editProduct (input)
}

function editProduct (input) {
  input.form = new formidable.IncomingForm({
    uploadDir: path.join(__dirname, '/../../public/uploads'),
    keepExtensions: true
  })

  handle(input)
}

function dbError (res) {
  res.json(errorResponse({}))
}

function invailidData (res) {
  res.json(errorResponse(GError(libError.INVALID_DATA)))
}

function success (res) {
  res.json(successResponse({}))
}
