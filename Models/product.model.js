const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const productSchema = new mongoose.Schema({
    product_key: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
      max: 200,
    },
    description: {
      type: String,
      required: true,
      max: 10000,

    },
    image:
      {
        image: Buffer,
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
    product_reference: {
      type: String,
      required: true,
      max: 50,
    },
    promotionPrice: {
      type: String,
      max: 50,
      // required: true,
    },
    category: {
      type: String,
      max: 50,
      required: true,
    },


  }, { timestamps: true },
)
productSchema.plugin(AutoIncrement, { inc_field: 'product_key' })

module.exports = mongoose.model('Product', productSchema)