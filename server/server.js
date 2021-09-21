const express = require('express')
const dotenv = require('dotenv').config()
const axios = require('axios')
const app = express()
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.port || 8888
const sneakerRouter = require('./routes/sneakers')
const database = require('./database/connection')

app.use(cors())
app.use(express.json())
app.use(sneakerRouter)

const getAllBrands = {
  method: 'GET',
  url: 'https://v1-sneakers.p.rapidapi.com/v1/sneakers',
  params: {limit: '100', brand: 'jordan'},
  headers: {
    'x-rapidapi-host': 'v1-sneakers.p.rapidapi.com',
    'x-rapidapi-key': '4a1ae12979msh723335e2f4d235ep12496ejsn5cc07d412b1c'
  }
};

axios.request(options)
  .then((response) => {
    console.log(JSON.stringify(response.data, null, 2))
  }).catch(function (error) {
    console.error(error);
  });


app.listen(PORT, () => {
  database.connectToServer((err) => {
    if (err) {
      console.error(err)
    }
  })
  console.log(`Sneaker server listening on port ${PORT}`)
})