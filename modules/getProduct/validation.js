var successResponse = require('./../../helper/parseSuccessResponse')
var errorResponse = require('./../../helper/parseErrorResponse')
var handle = require('./handle')
var GError = require('./../../helper/Gerror').G_Error
var libError = require('./../../helper/constant').error

module.exports = function (req, res) {
  var input = {
    'res': res,
    'returnSuccessResponse': returnSuccessResponse,
    'returnErrorResponse': returnErrorResponse
  }

  handle(input)
}

function returnSuccessResponse (res, response) {
  res.json(successResponse(response))
}

function returnErrorResponse (res, response) {
  res.json(errorResponse(response))
}
