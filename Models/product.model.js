const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      max: 10000,

    },
    image:
      {
        data: Buffer,
        contentType: String,
      },
    price: {
      type: String,
      max: 50,
    },
    quantity: {
      type: String,
      max: 50,
      required: true,
    },
    reference: {
      type: String,
      required: true,
      max: 50,
    },
    promotionPrice: {
      type: String,
      max: 50,
      required: true,
    },
    category: {
      type: String,
      max: 50,
      required: true,
    },


  }, { timestamps: true },
)
module.exports = mongoose.model('Product', productSchema)