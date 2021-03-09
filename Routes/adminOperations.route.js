const adminRouter = require('express').Router()
const createCategory = require('../Controller/createCategory.controller')
const addProduct = require('../Controller/addProduct.controller')
const updateProduct = require('../Controller/updateProduct.controller')
const deleteProduct = require('../Controller/deleteProduct.controller')

const auth = require('../Middleware/auth')
const Product = require('../Models/product.model')
const Category = require('../Models/categories.model')
var multer = require('multer');
var path = require('path');
var ObjectId = require('mongodb').ObjectID;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
var upload = multer({ storage: storage });

adminRouter.post('/uploadPhoto', auth, upload.single('photo'), (req, res) => {
  try {
    if (req.file) {
      res.json(req.file);
    } else throw 'error';
  } catch (e) {
    res.json(e);
  }
});


adminRouter.get('/photo/:_id', auth, function (req, res) {

  var filename = req.params._id;

  Product.findOne({ '_id': ObjectId(filename) }, (err, result) => {
    if (err) return console.log("err****** ", err);

    res.contentType('image/png');
    res.send(result.image.image)


  })
})
adminRouter.post('/createCategory', auth, createCategory.createCategory)
adminRouter.get('/allProducts', auth, function (req, res) {
  Product.find({}, function (err, products) {
    res.send({ data: products, status: "OK" });
  });
});
adminRouter.get('/allCategories', auth, function (req, res) {
  Category.find({}, function (err, categories) {
    res.send({ data: categories, status: "OK" });
  });
});
adminRouter.post('/addProduct', auth, addProduct.addProduct)
adminRouter.post('/updateProduct', auth, updateProduct.updateProduct)
adminRouter.post('/deleteProduct', auth, deleteProduct.deleteProduct)


module.exports = adminRouter