const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const publishRequestSchema = new mongoose.Schema({

  user_key: {
    type: Number,
     required: true,
  },
  name: {
    type: String,
    required: true,
    max: 200,
  },
  email: {
    type: String,
    required: true,
    max: 200,
  },
  status: {
  type: String,
    required: true,
    max: 200,
},
  productsNumber: {
      type: Number,
      required: true,
    },
    request_key: {
      type: Number,
    },
  }, { timestamps: true },
)
publishRequestSchema.plugin(AutoIncrement, { inc_field: 'request_key' })
module.exports = mongoose.model('PublishRequest', publishRequestSchema)