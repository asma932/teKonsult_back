const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    key: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      max: 200,
    },
    role: {
      type: String,
    },
    image:
      {
        image: Buffer,
        contentType: String,
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
  }, { timestamps: true },
)
module.exports = mongoose.model('User', userSchema)