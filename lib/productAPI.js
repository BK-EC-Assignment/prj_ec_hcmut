var getProduct = require('./../modules/getProduct/validation')
var addProduct = require('./../modules/addProduct/validation')
var editProduct = require('./../modules/editProduct/validation')
var deleteProduct = require('./../modules/deleteProduct/validation')
var getDetailProduct = require('./../modules/detailProduct/validation')

module.exports = function () {
  this.act('role: web', { use: Product })
}

function Product (req, res, next) {
  if ((req.url === '/api/product') && (req.method === 'GET')) {
    getProduct(req, res);
  } else if ((req.url === '/api/product/:rid') && (req.method === 'GET')) {
    getDetailProduct(req, res);
  } else if ((req.url === '/api/product') && (req.method === 'POST')) {
    addProduct(req, res);
  } else if ((req.url === '/api/product') && (req.method === 'PUT')) {
    editProduct(req, res);
  } else if ((req.url === '/api/product') && (req.method === 'DELETE')) {
    deleteProduct(req, res);
  } else {
    next();
  }
}
