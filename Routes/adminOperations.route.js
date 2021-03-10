const adminRouter = require('express').Router()
const createCategory = require('../Controller/createCategory.controller')
const addProduct = require('../Controller/addProduct.controller')
const updateProduct = require('../Controller/updateProduct.controller')
const deleteProduct = require('../Controller/deleteProduct.controller')
const addOrUpdateRateToProduct = require('../Controller/ratingPerProduct.controller')
const getRatePerUserPerProduct = require('../Controller/ratingPerProduct.controller')
const getRatesPerProduct = require('../Controller/ratingPerProduct.controller')
const UpdateCommentToProduct = require('../Controller/commentsPerProduct.controller')
const getCommentsPerProduct = require('../Controller/commentsPerProduct.controller')
const addComment = require('../Controller/commentsPerProduct.controller')


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

adminRouter.post('/uploadPhoto', upload.single('photo'), (req, res) => {
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
adminRouter.post('/createCategory',auth, createCategory.createCategory)
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
adminRouter.post('/getUserRates', getRatePerUserPerProduct.getRatePerUserPerProduct)
adminRouter.post('/getRates', getRatesPerProduct.getRatesPerProduct)
adminRouter.post('/setRate', auth, addOrUpdateRateToProduct.addOrUpdateRateToProduct)
adminRouter.post('/updateComment', auth, UpdateCommentToProduct.UpdateCommentToProduct)
adminRouter.post('/getComments', auth, getCommentsPerProduct.getCommentsPerProduct)
adminRouter.post('/addComment', auth, addComment.addComment)
adminRouter.post('/editCategory', createCategory.updateCategory)
adminRouter.post('/deleteCategory', createCategory.deleteCategory)


module.exports = adminRouter