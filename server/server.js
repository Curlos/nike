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


app.listen(PORT, () => {
  database.connectToServer((err) => {
    if (err) {
      console.error(err)
    }
  })
  console.log(`Sneaker server listening on port ${PORT}`)
})