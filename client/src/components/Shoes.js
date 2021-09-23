import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import ThumbnailShoe from './ThumbnailShoe'
import axios from 'axios'

const Shoes = ({ finalizedSearchQuery, resetFinalizedSearchQuery, handleSelectShoe }) => {

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
        const body = {
          "name": finalizedSearchQuery
        }
        const response = await axios.post(`http://localhost:3001/sneakers/brands/${brand.toUpperCase()}/filter`, body)
        const data = response.data

        console.log(data)

        setShoes(data)
        setIsLoading(false)
        // resetFinalizedSearchQuery() 
      }
    }
    fetchFromServer()
  }, [finalizedSearchQuery, brand])


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