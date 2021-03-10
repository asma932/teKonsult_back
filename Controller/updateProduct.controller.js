const Product = require('../Models/product.model')
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

//updateProduct Controller
async function updateProduct(req, res, next) {
  var product_key=req.body.product_key




  var newvalues = {}
  if (req.body.image !== '') {
    var img = fs.readFileSync(req.body.image);
    var encode_image = img.toString('base64');
    var finalImg = {
      contentType: "image/png",
      image: Buffer.from(encode_image, 'base64'),
    };
    newvalues = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        image: finalImg,
        price: req.body.price,
        quantity: req.body.quantity,
        product_reference: req.body.product_reference,
        promotionPrice: req.body.promotionPrice,
        category: req.body.category,
      },
    };
  } else {
    newvalues = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        product_reference: req.body.product_reference,
        promotionPrice: req.body.promotionPrice,
        category: req.body.category,
      },
    };
  }

  try {

    await Product.updateOne(
      { product_key },
      newvalues,
    );




    res.status(200).json({
      newvalues
      , status: "OK",
    })

  } catch (err) {
    // res.status(400).json({ 'error': err,status:"KO" })
  }
}

module.exports = {
  updateProduct,
}