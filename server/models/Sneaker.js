const mongoose = require('mongoose')

const sneakerSchema = new Schema(
  {
    sneakerID: {type: String, required: true},
    brand: {type: String, required: true},
    colorway: {type: String, required: true},
    gender: {type: String, required: true},
    name: {type: String, required: true},
    releaseDate: {type: String, required: true},
    retailPrice: {type: Number, required: true},
    shoe: {type: String, required: true},
    styleId: {type: String, required: true},
    title: {type: String, required: true},
    year: {type: Number, required: true},
    media: {
      imageUrl: String,
      smallImageUrl: String,
      thumbUrl: String,
    },

  }
)

const Sneaker = mongoose.model('Sneaker', sneakerSchema)

module.exports = Sneaker;
