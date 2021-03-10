const Product = require('../Models/product.model')
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

//deleteProduct Controller
async function deleteProduct(req, res, next) {
  var product_key = req.body.product_key
  await Product.findOneAndRemove({ product_key }, function (err) {
    if (err) {
      res.status(400).json({ status: "OK", message: err })
    } else {
      res.status(200).json({ status: "OK", message: 'Deleted' })
    }
  });

}

module.exports = {
  deleteProduct,
}