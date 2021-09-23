import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import ThumbnailShoe from './ThumbnailShoe'
import axios from 'axios'

const Shoes = ({ finalizedSearchQuery, handleSelectShoe }) => {

  const [shoes, setShoes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { brand } = useParams()

  useEffect(() => {

    const fetchFromServer = async () => {
      if (finalizedSearchQuery === '') {
        const response = await axios.get(`http://localhost:3001/sneakers/brands/${brand.toUpperCase()}`)
        const data = response.data

        console.log(data)

        setShoes(data)
        setIsLoading(false) 
      } else {
        const response = await axios.post(`http://localhost:3001/sneakers/brands/${brand.toUpperCase()}`)
        const data = response.data

        console.log(data)

        setShoes(data)
        setIsLoading(false) 
      }
    }
    fetchFromServer()
  }, [finalizedSearchQuery])


  return (

    <div class="shoesContainer">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        shoes.map((shoeObj) => {
         return (
          <ThumbnailShoe key={shoeObj.sneakerID} shoeObj={shoeObj} handleSelectShoe={handleSelectShoe}/>
         )
        })
      )}
    </div>
  )
}

export default Shoes;