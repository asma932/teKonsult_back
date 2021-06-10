const Product = require('../Models/product.model')
const PublishRequest = require('../Models/publishRequest.model')
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

//deleteProduct Controller
async function deleteProduct(req, res, next) {
  var product_key = req.body.product_key
  await Product.findOneAndRemove({ product_key },  function (err) {
    if (err) {
      res.status(400).json({ status: "OK", message: err })
    } else {

      PublishRequest.find({ user_key: req.body.user_key }, async function (err, requests) {
        if (err) {
          res.json({ error: err, message: "Error in Fetching requests", status: 'Failure' });
        }
        const result = requests.filter(item => item.user_key === req.body.user_key)
        let newvalues = {
          $set: {
            productsNumber: result[0].productsNumber + 1,
          }
        }
        await PublishRequest.updateOne(
          { user_key: req.body.user_key },
          newvalues,
        );
      })

      res.status(200).json({ status: "OK", message: 'Deleted' })
    }
  });

}

module.exports = {
  deleteProduct,
}