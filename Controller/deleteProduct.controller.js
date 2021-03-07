const Product = require('../Models/product.model')
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

//deleteProduct Controller
async function deleteProduct(req, res, next) {

   await Product.findByIdAndRemove(req.body._id, req.body, function (err, data) {
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