const mongoose = require('mongoose')

const Review = mongoose.model(
  "User",
  new mongoose.Schema({
    title: { type: String, required: true},
    stars: { type: String, required: true},
    date: { type: Date, required: true},
    content: { type: String, required: true},
    author: { type: String, required: true},
  })
);

module.exports = Review;