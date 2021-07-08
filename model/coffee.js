const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coffeeSchema = new Schema({
  namaCoffee: {
    type: String
  },
  harga: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
  deskripsi : {
    type: String
  },
  image: {
    type: String
  }
})

module.exports = mongoose.model('coffee', coffeeSchema)