const express = require('express')
const mongoose = require('mongoose')
const sneakerSchema = require('../schemas/sneakerV2Schema')
const User = require('../models/User')
const Review = require('../models/Review')
const { deserializeUser } = require('passport')

const router = express.Router()

router.get('/:brand/:shoeID', async (req, res) => {
  const brand = req.params.brand.toUpperCase()
  const shoeID = req.params.shoeID
  const Sneaker = mongoose.model('Sneaker', sneakerSchema, brand)

  console.log(brand)
  console.log(shoeID)

  const shoe = await Sneaker.findOne({ sneakerID: shoeID })

  res.json(shoe)
})

router.post('/review/:brand/:shoeID', async (req, res) => {
  const { brand, shoeID } = req.params
  const { rating, recommended, summary, content, author, date } = req.body
  const Sneaker = mongoose.model('Sneaker', sneakerSchema, brand)

  const review = new Review({
    rating: rating,
    recommended: recommended,
    summary: summary,
    content: content,
    author: author,
    date: date
  })

  console.log(review)

  const user = await User.findOne({_id: author._id})
  const shoe = await Sneaker.findOne({ sneakerID: shoeID })

  user.reviews = [...user.reviews, review]
  shoe.reviews = [...shoe.reviews, review]

  await user.save()
  await shoe.save()
  await review.save()

  res.json(review)
})



module.exports = router;