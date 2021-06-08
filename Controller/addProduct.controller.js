const Product = require('../Models/product.model')
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

//addProduct Controller
async function addProduct(req, res, next) {


  const referenceExist = await Product.findOne({ product_reference: req.body.product_reference })
  if (referenceExist) {
    res.status(400).json({ message: 'Reference already Exist', status: "Failure" })
  }
  var img = fs.readFileSync(req.body.image);
  var encode_image = img.toString('base64');
  var finalImg = {
    contentType: "image/png",
    image: Buffer.from(encode_image, 'base64'),
  };
  console.log(req.body)
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    image: finalImg,
    price: req.body.price.replace(",","."),
    quantity: req.body.quantity,
    product_reference: req.body.product_reference,
    promotionPrice: req.body.promotionPrice,
    category: req.body.category,
    $inc: { product_key: 1 },
  })
  try {
    await product.save()
    //file removed
    // fs.unlinkSync(req.body.image)

    res.status(200).json({
      message:'Product Added!'
      , status: "OK",
    })

  } catch (err) {
    res.status(400).json({ 'error': err,status:"KO" })
  }
}

module.exports = {
  addProduct,
}