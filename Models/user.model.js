const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const userSchema = new mongoose.Schema({
    user_key: {
      type: Number,
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
userSchema.plugin(AutoIncrement, { inc_field: 'user_key' })

module.exports = mongoose.model('User', userSchema)