const mongoose = require('mongoose')
const CodeSchema = new mongoose.Schema({
  code: {
      type: String,
      required: true,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 200,

    },
  }, { timestamps: true },
)
module.exports = mongoose.model('Code', CodeSchema)