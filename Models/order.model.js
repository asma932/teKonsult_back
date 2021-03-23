const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const orderSchema = new mongoose.Schema({
    nom: {
      type: String,
      required: true,
      max: 50,
    },
    products:
      {
        type: Array,
        default: [],
      },
    region: {
      type: String,
      required: true,
      max: 50,
    },
    adresse: {
      type: String,
      required: true,
      max: 50,
    },
    numTel: {
      type: String,
      required: true,
      max: 50,
    },
    prenom: {
      type: String,
      required: true,
      max: 50,
    },
    moyenpaiement: {
      type: String,
      required: true,
      max: 50,
    },
    livraisonstandard: {
      type: String,
      required: true,
      max: 200,
    },
    quantity: {
      type: Number,
    },
    total: {
      type: Number,
    },
    status: {
      type: String,
      required: true,
      max: 200,
    },
    ville: {
      type: String,
      required: true,
      max: 200,
    },
    visited: {
      type: Boolean,
    },
    user_key: {
      type: Number,
    },
    order_key: {
      type: Number,
    },
  }, { timestamps: true },
)
orderSchema.plugin(AutoIncrement, { inc_field: 'order_key' })
module.exports = mongoose.model('Order', orderSchema)