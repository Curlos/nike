const express = require('express')

const router = express.Router()

const database = require('../database/connection')
const { getSneakersFromBrand, getSneakersFromAllBrands } = require('../utils/api')

router.get('/', (req, res) => {
  getSneakersFromBrand('Jordan')

  res.send('Hello world')
})

router.get('/all-sneakers', (req, res) => {
  getSneakersFromAllBrands()

  res.json({'message': 'Sneakers from all brands'})
})

module.exports = router;