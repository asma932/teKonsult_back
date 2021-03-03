const Product = require('../Models/product.model')
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

//addProduct Controller
async function addProduct (req, res, next) {





    const titleExist = await Product.findOne({ title: req.body.title })
    if (titleExist) {
        res.status(400).json({ "error": 'product already Exist',status:"Failure" })
    }
  var image_digest = crypto.createHash('sha256');
  image_digest.update(fs.readFileSync(req.body.image));
  image_digest = image_digest.digest('base64').toString();
    const product = new Product({
            title: req.body.title,
            description: req.body.description,
            image:{
              data: image_digest,
              contentType: 'image/png'
            },
            price:req.body.price,
            quantity:req.body.quantity,
            reference:req.body.reference,
            promotionPrice:req.body.promotionPrice,
            category:req.body.category,
    })
    try {
        const newProduct = await product.save()
            res.status(200).json({
                newProduct
                ,status:"OK"
            })

    } catch (err) {
        res.status(400).json({ 'error': err,status:"KO" })
    }
}

module.exports = {
   addProduct,
}