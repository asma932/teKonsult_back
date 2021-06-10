const Product = require('../Models/product.model')
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

const PublishRequest = require('../Models/publishRequest.model')

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
  var user_key=req.body.user_key
  const product = new Product({
    user_key,
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

    //file removed
    // fs.unlinkSync(req.body.image)

    PublishRequest.find({ user_key: req.body.user_key }, async function (err, requests) {
      if (err) {
        res.json({ error: err, message: "Error in Fetching requests", status: 'Failure' });
      }


      try {

        Product.find({ user_key: req.body.user_key }, async function (err, products) {

          if (err) {
            res.json({ error: err, message: "Error in Fetching requests", status: 'Failure' });
          }
          const result = requests.filter(item => item.user_key === user_key)
          if (result[0].productsNumber >products.length) {



            await product.save()
            let newvalues = {
              $set: {
                productsNumber: result[0].productsNumber - 1,
              }
            }
            PublishRequest.updateOne(
              { user_key: user_key },
              newvalues,
            );
            res.status(200).json({
              message:'Product Added!'
              , status: "OK",
            })
          }else {
            res.status(200).json({
              message:'Vous avez dépassé la limite de publication de produits autorisée par l\'administrateur.'
              , status: "Failure",
            })
          }
        })

      } catch (err) {
        res.status(200).json({ 'message': err, status: "Failure" })
      }
    })

  } catch (err) {
    res.status(400).json({ 'error': err,status:"Failure" })
  }
}

module.exports = {
  addProduct,
}