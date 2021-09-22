const axios = require('axios')
const Sneaker = require('../models/Sneaker')

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
  
  try {
    const response = await axios.request(options)
    console.log(JSON.stringify(response.data, null, 4))
    return response.data
  } catch (err) {
    console.error(err)
  }
}

const getSneakersFromAllBrands = async () => {
  const allBrands = await getAllBrands()
  await timer(2000)

  for (let brand of allBrands) {
    if (brand === 'AIR JORDAN') {
      const brandSneakers = await getSneakersFromBrand('Jordan')
      sneakers[brand] = brandSneakers
      console.log(brand)
      console.log('---')
    } else {
      const brandSneakers = await getSneakersFromBrand(brand)
      sneakers[brand] = brandSneakers
      console.log(brand)
      console.log('---')
    }

    await timer(2000)
  }

  console.log(sneakers)
}

// getSneakersFromAllBrands()

getSneakersFromBrand('Jordan')