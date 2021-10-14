const mongoose = require('mongoose')

const Review = mongoose.model(
  "Review",
  new mongoose.Schema({
    rating: { type: String, required: true},
    recommended: { type: String, required: true},
    summary: { type: String, required: true},
    content: { type: String, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: String, required: true},
  })
);

module.exports = Review;