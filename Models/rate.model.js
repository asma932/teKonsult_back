const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const rateSchema = new mongoose.Schema({
    rate_key: {
      type: Number,
    },
    product_key: {
      type: Number,
      // required: true,
      // max: 50,
    },
    user_key: {
      type: Number,
      // required: true,
      // max: 200,
    },
    rate_value: {
      type: Number,
    },
  }, { timestamps: true },
)
rateSchema.plugin(AutoIncrement, { inc_field: 'rate_key' })

module.exports = mongoose.model('Rate', rateSchema)