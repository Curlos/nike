const axios = require('axios')
const mongoose = require('mongoose')
const database = require('../database/connection')
const sneakerSchema = require('../schemas/sneakerSchema')

const sneakers = {}

const timer = ms => new Promise(res => setTimeout(res, ms))

const getAllBrands = async () => {
  const options = {
    method: 'GET',
    url: 'https://v1-sneakers.p.rapidapi.com/v1/brands',
    headers: {
      'x-rapidapi-host': 'v1-sneakers.p.rapidapi.com',
      'x-rapidapi-key': '4a1ae12979msh723335e2f4d235ep12496ejsn5cc07d412b1c'
    }
  }
  
  try {
    const response = await axios.request(options)
    const allBrands = await response.data.results
    return allBrands
  } catch (err) {
    console.error(err)
  }
}

const getSneakersFromBrand = async (brand) => {
  const options = {
    method: 'GET',
    url: 'https://v1-sneakers.p.rapidapi.com/v1/sneakers',
    params: {limit: '100', brand: brand},
    headers: {
      'x-rapidapi-host': 'v1-sneakers.p.rapidapi.com',
      'x-rapidapi-key': '4a1ae12979msh723335e2f4d235ep12496ejsn5cc07d412b1c'
    }
  }

  const Sneaker = mongoose.model('Sneaker', sneakerSchema, brand)
  
  try {
    const response = await axios.request(options)
    const brandSneakers = response.data.results

    brandSneakers.forEach(async (sneaker) => {
      const {id, brand, colorway, gender, name, releaseDate, retailPrice, shoe, styleId, title, year, media} = sneaker

      const newSneaker = Sneaker(
        {
          sneakerID: id,
          brand: brand,
          colorway: colorway,
          gender: gender,
          name: name,
          releaseDate: releaseDate,
          retailPrice: retailPrice,
          shoe: shoe,
          styleId: styleId,
          title: title,
          year: year,
          media: {
            imageUrl: media.imageUrl,
            smallImageUrl: media.smallImageUrl,
            thumbUrl: media.thumbUrl,
          },
      })

      await newSneaker.save((err, result) => {
        if (err) return console.error(err)
        console.log(result.title + " saved to sneaker collection")
      })
    })

    return response.data.results
  } catch (err) {
    console.error(err)
  }
}

const getSneakersFromAllBrands = async () => {
  const allBrands = await getAllBrands()

  for (let brand of allBrands) {
    if (brand === 'AIR JORDAN') {
      console.log(`Getting sneakers from '${brand}'`)
      const brandSneakers = await getSneakersFromBrand('Jordan')
      sneakers[brand] = brandSneakers
    } else {
      console.log(`Getting sneakers from '${brand}'`)
      const brandSneakers = await getSneakersFromBrand(brand)
      sneakers[brand] = brandSneakers
    }

    await timer(2000)
  }

  console.log(sneakers)
  console.log('All sneakers have been retrieved!')
}

module.exports = {
  getAllBrands,
  getSneakersFromBrand,
  getSneakersFromAllBrands,
}