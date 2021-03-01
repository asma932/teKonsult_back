const Category = require('../Models/categories.model')
const bycrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");


//createCategory Controller
async function createCategory(req, res, next) {

  const titleExist = await Category.findOne({ title: req.body.title })
  if (titleExist) {
    res.status(400).json({ "error": 'Categorie already Exist',status:"Failure" })
  }

  const category = new Category({
    title: req.body.title,
    description: req.body.description,
  })
  try {
    const newCategory = await category.save()
    const payload = {
      user: {
        id: newCategory.id,
      },
    };
    jwt.sign(payload, "anystring", { expiresIn: 10000 }, function (err, token) {
      if (err) {
        res.send(err)
      }
      res.status(200).json({
        token,
        newCategory
        ,status:"OK"
      })
    })
  } catch (err) {
    res.status(400).json({ 'error': err,status:"KO" })
  }
}

module.exports = {
  createCategory,
}