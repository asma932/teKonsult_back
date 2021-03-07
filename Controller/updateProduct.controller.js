const Product = require('../Models/product.model')
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

//updateProduct Controller
async function updateProduct(req, res, next) {

  const titleExist = await Product.findOne({ title: req.body.title })
  if (titleExist) {
    res.status(400).json({ message: 'Product already Exist', status: "Failure" })
  }


  var newvalues = {}
  if (req.body.image !== '') {
    var img = fs.readFileSync(req.body.image);
    console.log("***************************************", img)
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
        reference: req.body.reference,
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
        reference: req.body.reference,
        promotionPrice: req.body.promotionPrice,
        category: req.body.category,
      },
    };
  }

  try {

    await Product.updateOne(
      { _id: req.body._id },
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