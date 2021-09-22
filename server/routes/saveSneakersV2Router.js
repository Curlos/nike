const express = require('express')
const { route } = require('express/lib/router')

const router = express.Router()

const database = require('../database/connection')
const { getAllGenders, getAllBrands, getSneakersFromBrand, getSneakersFromAllBrands, getSneakersFromAllGenders } = require('../utils/sneakerV2_api')

router.get('/all/genders/', async (req, res) => {
  const allGenders = await getAllGenders()
  res.json(allGenders)
})

router.get('/all/brands/', async (req, res) => {
  const allBrands = await getAllBrands()
  res.json(allBrands)
})

router.get('/brands/:brand', async (req, res) => {
  const brandSneakers = await getSneakersFromBrand('Air Jordan')
  res.json(brandSneakers)
})

router.get('/all-sneakers/brand', (req, res) => {
  const allSneakers = getSneakersFromAllBrands()

  res.json(allSneakers)
})

router.get('/all-sneakers/gender', (req, res) => {
  const allSneakers = getSneakersFromAllGenders()

  res.json(allSneakers)
})

module.exports = router;