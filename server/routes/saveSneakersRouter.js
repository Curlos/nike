const express = require('express')

const router = express.Router()

const database = require('../database/connection')
const { getSneakersFromBrand, getSneakersFromAllBrands } = require('../utils/sneakerApi')

router.get('/', (req, res) => {
  getSneakersFromBrand('Jordan')
})

router.get('/all-sneakers', (req, res) => {
  getSneakersFromAllBrands()

  res.json({'message': 'Sneakers from all brands'})
})

module.exports = router;