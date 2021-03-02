const Product = require('../Models/product.model')
var fs = require('fs');
var path = require('path');


//addProduct Controller
async function addProduct (req, res, next) {





    const titleExist = await Product.findOne({ title: req.body.title })
    if (titleExist) {
        res.status(400).json({ "error": 'product already Exist',status:"Failure" })
    }
// const cleanPath=
    const product = new Product({
            title: req.body.title,
            description: req.body.description,
            image:{
              data: fs.readFileSync(path.join(__dirname + '/uploads/images/'+ req.body.image)),
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