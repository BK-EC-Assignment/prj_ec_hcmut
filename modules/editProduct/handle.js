var editProduct = require('./editProduct.js')
module.exports = function (input) {
  input.form.parse(input.req, function (err, fields, files) {
    if (err) {
      return input.errHandle(input.done)
    } else {
      return editProduct(input, fields, files)
    }
  })
}
