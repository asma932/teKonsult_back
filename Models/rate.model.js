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
    user_id: {
      type: String,
      required: true,
      max: 200,
    },
    rate_value: {
      type: Number,
    },
  }, { timestamps: true },
)
module.exports = mongoose.model('Rate', categoriesSchema)