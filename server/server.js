const express = require('express')
const dotenv = require('dotenv').config()
const axios = require('axios')
const app = express()

const options = {
  method: 'GET',
  url: 'https://v1-sneakers.p.rapidapi.com/v1/sneakers',
  params: {limit: '20', name: 'Lebron'},
  headers: {
    'x-rapidapi-host': 'v1-sneakers.p.rapidapi.com',
    'x-rapidapi-key': '4a1ae12979msh723335e2f4d235ep12496ejsn5cc07d412b1c'
  }
};

axios.request(options)
  .then((response) => {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });


app.listen(PORT || 8888, () => console.log(`Sneaker server listening on port ${PORT}`))