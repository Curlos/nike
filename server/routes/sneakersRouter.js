const express = require('express')
const mongoose = require('mongoose')
const sneakerSchema = require('../schemas/sneakerSchema')

const router = express.Router()

const ALL_BRANDS = [
  'ADIDAS',
  'BALENCIAGA',
  'CHANEL',
  'CONVERSE',
  'CROCS',
  'DIADORA',
  'DIOR',
  'GUCCI',
  'JORDAN',
  'LI-NING',
  'LOUIS VUITTON',
  'NEW BALANCE',
  'NIKE',
  'OFF-WHITE',
  'PUMA',
  'REEBOK',
  'SAUCONY',
  'UNDER ARMOUR',
  'VANS',
  'VERSACE',
  'YEEZY'
]

router.get('/', async (req, res) => {
  console.log('Getting all sneakers from database')
  const allSneakers = []

  for (let brand of ALL_BRANDS) {
    try {
      const Sneaker = mongoose.model('Sneaker', sneakerSchema, brand)
      console.log(`Getting all '${brand}' brand sneakers from database...`)
      const brandSneakers = await Sneaker.find({})
      allSneakers.push(brandSneakers)
    } catch (err) {
      console.error(err)
    }
  }
  
  res.json(allSneakers)
})

router.get('/:brand', async (req, res) => {
  const brand = req.params.brand
  console.log(`Getting all '${brand}' brand sneakers from database...`)
  // const Sneaker = mongoose.model('Sneaker', sneakerSchema, brand)
  const Sneaker = mongoose.model('Sneaker', sneakerSchema, brand)

  const jordanSneakers = await Sneaker.find({})
  res.json(jordanSneakers)
})



module.exports = router;