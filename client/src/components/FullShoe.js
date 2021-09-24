import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import SiteLink from './SiteLink'

const FullShoe = () => {

  const [shoe, setShoe] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { brand, sneakerID } = useParams()

  useEffect(() => {

    axios.get(`http://localhost:3001/sneakers/shoe/${brand}/${sneakerID}`).then((response, err) => {
        if (err) console.error(err)

        setShoe(...response.data)
        setIsLoading(false)
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sneakerID])

  if (!isLoading) {
    console.log(shoe)
  }

  return (
    <div>
      {isLoading === false ? (
        <div className="fullSizeShoeContainer">
          <img src={shoe.image.original} alt={shoe.name} className="shoeImage"/>

          <div className="shoeDetails">
            <div className="shoeName">
              {shoe.name}
            </div>

            <div className="shoePrice">
              Price: ${shoe.retailPrice}
            </div>

            {shoe.story ? (
              <div className="shoeStory">
                {shoe.story}
              </div>
            ) : null}

            <div>
              Brand: {shoe.brand}
            </div>

            <div>
              Sku: {shoe.sku}
            </div>

            <div>
              Release Date: {shoe.releaseDate}
            </div>

            <div>
              Release Year: {shoe.releaseYear}
            </div>

            <div>
              Colorway: {shoe.colorway}
            </div>



            <div className="siteLinks">
              {shoe.links.flightClub !== '' ? (
                <SiteLink link={shoe.links.flightClub} imgSrc="/assets/flight_club.png" />
              ) : null}

              {shoe.links.goat !== '' ? (
                <SiteLink link={shoe.links.goat} imgSrc="/assets/goat.png" />
              ) : null}

              {shoe.links.stadiumGoods !== '' ? (
                <SiteLink link={shoe.links.stadiumGoods} imgSrc="/assets/stadium_goods.svg" />
              ) : null}

              {shoe.links.stockX !== '' ? (
                <SiteLink link={shoe.links.stockX} imgSrc="/assets/stockx.jpeg" />
              ) : null}
              
            </div>
            
          </div>
        </div>
      ) : (
        <div>
          Loading...

          Shoe: {shoe.name}
        </div>
      )}
    </div>
  )
}

/*

<div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="fullSizeShoeContainer">
          <img src={shoe.image.original} alt={shoe.name} className="shoeImage"/>
          <div className="shoeName">{shoe.name}</div>
        </div>
      )}
    </div>
    */

export default FullShoe;