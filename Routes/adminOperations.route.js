const adminRouter = require('express').Router()
const createCategory = require('../Controller/createCategory.controller')
const addProduct = require('../Controller/addProduct.controller')
const auth = require('../Middleware/auth')
const Product = require('../Models/product.model')
var multer = require('multer');
var path = require('path');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
var upload = multer({ storage: storage });

adminRouter.post('/uploadPhoto', upload.single('photo'), (req, res) => {
  try {
    if (req.file) {
      res.json(req.file);
    } else throw 'error';
  } catch (e) {
    res.json(e);
  }
});
adminRouter.post('/createCategory', createCategory.createCategory)
adminRouter.get('/allProducts', function (req, res) {
  Product.find({}, function (err, products) {
    var productsMap = {};
    products.forEach(function (product) {
      productsMap[product.reference] = product;
    });

    res.send(productsMap);
  });
});
adminRouter.post('/addProduct', addProduct.addProduct)

module.exports = adminRouter