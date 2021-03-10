const mongoose = require('mongoose')
const categoriesSchema = new mongoose.Schema({
    key: {
      type: String,
    },
    product_reference: {
      type: String,
      required: true,
      max: 50,
    },
    image:
      {
        image: Buffer,
        contentType: String,
      },
    user_id: {
      type: String,
      required: true,
      max: 200,
    },
    comment: {
      type: String,
      max: 600,
    },
    author: {
      type: String,
    },
    readOnly: {
      type: Boolean,
    },
  }, { timestamps: true },
)
module.exports = mongoose.model('Comment', categoriesSchema)