const express = require('express')

const router = express.Router()

const database = require('../database/connection')

router.get('/', (req, res) => {
  console.log(req)
  console.log('hello database')

  res.send('Hello world')
})

module.exports = router;