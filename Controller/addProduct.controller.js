const Product = require('../Models/product.model')
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

//addProduct Controller
async function addProduct(req, res, next) {


  const titleExist = await Product.findOne({ title: req.body.title })
  if (titleExist) {
    res.status(400).json({ "error": 'Product already Exist', status: "Failure" })
  }


  var img = fs.readFileSync(req.body.image);
  var encode_image = img.toString('base64');

  var finalImg = {
    contentType: "image/png",
    image: Buffer.from(encode_image, 'base64'),

  };

  // var image_digest = crypto.createHash('sha256');
  // image_digest.update(fs.readFileSync(req.body.image));
  // image_digest = image_digest.digest('base64').toString();
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    image: finalImg,
    price: req.body.price,
    quantity: req.body.quantity,
    reference: req.body.reference,
    promotionPrice: req.body.promotionPrice,
    category: req.body.category,
  })
  try {
    //file removed
    fs.unlinkSync(req.body.image)
    const newProduct = await product.save()
    res.status(200).json({
      newProduct
      , status: "OK",
    })

  } catch (err) {
    // res.status(400).json({ 'error': err,status:"KO" })
  }
}

module.exports = {
  addProduct,
}