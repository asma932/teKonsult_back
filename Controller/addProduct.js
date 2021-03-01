const Product = require('../Models/product.model')
const bycrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");


//addProduct Controller
async function addProduct (req, res, next) {

    const titleExist = await Product.findOne({ title: req.body.title })
    if (titleExist) {
        res.status(400).json({ "error": 'product already Exist',status:"Failure" })
    }

    const product = new Product({
            title: req.body.title,
            description: req.body.description,
            image:req.body.image,
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