const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const commentSchema = new mongoose.Schema({
  comment_key: {
      type: Number,
    },
    product_key: {
      type: Number,
      // required: true,
      // max: 50,
    },
    image:
      {
        image: Buffer,
        contentType: String,
      },
    user_key: {
      type: Number,
      // required: true,
      // max: 200,
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
commentSchema.plugin(AutoIncrement,{inc_field:'comment_key'})
module.exports = mongoose.model('Comment', commentSchema)