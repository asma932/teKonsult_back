const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
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
    key: {
      type: Number,
    },
  }, { timestamps: true },
)
categoriesSchema.plugin(AutoIncrement, { inc_field: 'key' })
module.exports = mongoose.model('Category', categoriesSchema)