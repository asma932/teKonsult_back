const mongoose = require('mongoose')
const categoriesSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      max: 200,

    },
  }, { timestamps: true },
)
module.exports = mongoose.model('Category', categoriesSchema)