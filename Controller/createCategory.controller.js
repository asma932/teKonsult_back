const Category = require('../Models/categories.model')
const jwt = require("jsonwebtoken");
var fs = require('fs');

//createCategory Controller
async function createCategory(req, res, next) {

  var img = fs.readFileSync(req.body.image);
  var encode_image = img.toString('base64');
  var finalImg = {
    contentType: "image/png",
    image: Buffer.from(encode_image, 'base64'),
  };

  const category = new Category({
    title: req.body.title,
    image: finalImg,
    description: req.body.description,
    $inc: { key: 1 },
  })
  try {
    const newCategory = await category.save()
    res.status(200).json({
      message: "Category created!", status: "OK",
    })

  } catch (err) {
    res.status(400).json({ message: err, status: "Failure" })
  }
}

async function updateCategory(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  var key = req.body.key;
  var newvalues = {}
  if (req.body.image !== '') {
    var img = fs.readFileSync(req.body.image);
    var encode_image = img.toString('base64');
    var finalImg = {
      contentType: "image/png",
      image: Buffer.from(encode_image, 'base64'),
    };


    newvalues = {
      $set: {
        image: finalImg,
        title,
        description,
        key,
      },
    };
  }else {
    newvalues = {
      $set: {
        title,
        description,
        key,
      },
    }
  }

    try {

      await Category.updateOne(
        { key },
        newvalues,
      );




      res.status(200).json({
        newvalues
        , status: "OK",
      })

    } catch (err) {
      // res.status(400).json({ 'error': err,status:"KO" })
    }

  //
  // const category = new Category({
  //   title,
  //   description,
  //   key,
  // });
  //
  // try {
  //   Category.find({}, async function (err, data) {
  //     const filter = { key };
  //     const update = { title, description };
  //     await Category.findOneAndUpdate(
  //         filter,
  //         update,
  //     );
  //     res.send({ message: 'Category edited!', category, status: "OK" });
  //   });
  //
  // } catch (e) {
  //   res.send({ message: e, status: "Failure" });
  // }
}

async function deleteCategory(req, res) {
  await Category.deleteOne({ 'key': req.body.key }).then(function () {
    res.status(200).json({ status: "OK", message: 'Category deleted!' })
  }).catch(err => {
    res.status(400).json({ status: "Failure", message: err })

  })
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
}