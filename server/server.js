const express = require('express')
const dotenv = require('dotenv').config()
const axios = require('axios')
const app = express()
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 8888
const sneakersV2Router = require('./routes/sneakersV2Router')
const saveSneakersV2Router = require('./routes/saveSneakersV2Router')
const database = require('./database/connection')

app.use(cors())
app.use(express.json())
app.use('/sneakers', sneakersV2Router)
app.use('/save-sneakers-v2', saveSneakersV2Router)


app.listen(PORT, () => {
  database.connectToServer((err) => {
    if (err) {
      console.error(err)
    }
  })
  console.log(`Server is listening on port ${PORT}`)
})