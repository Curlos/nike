const mongoose = require('mongoose')

const sneakerV2Schema = new mongoose.Schema(
  {
    sneakerID: {type: String},
    sku: {type: String},
    brand: {type: String},
    name: {type: String},
    colorway: {type: String},
    gender: {type: String},
    silhouette: {type: String},
    releaseYear: {type: Number},
    releaseDate: {type: String},
    retailPrice: {type: Number},
    estimatedMarketValue: {type: Number},
    story: {type: String},
    image: {
      "360": {type: Array},
      original: {type: String},
      small: {type: String},
      thumbnail: {type: String},
    },
    links: {
      stockX: {type: String},
      goat: {type: String},
      flightClub: {type: String},
      stadiumGoods: {type: String},
    },
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    rating: {type: Number},
    favorites: {type: Number},
  }
)

module.exports = sneakerV2Schema;
