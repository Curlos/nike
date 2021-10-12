const mongoose = require('mongoose')

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    reviews: [{ type: String, required: true }],
    shoeFavorites: [{ type: String, required: true }],
    reviewUpvotes: [{ type: String, required: true }],
    reviewDownvotes: [{ type: String, required: true }],
    lowerCaseEmail: {type: String, lowercase: true, trim: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  })
);

module.exports = User;