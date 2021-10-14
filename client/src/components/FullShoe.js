import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import SiteLink from './SiteLink'
import ReactStars from "react-rating-stars-component";
import UserContext from '../contexts/UserContext';

const FullShoe = () => {

  const { loggedInUser } = React.useContext(UserContext)
  const [currUser, setCurrUser] = useState(loggedInUser)
  const [currShoe, setCurrShoe] = useState({})
  const [favorites, setFavorites] = useState(currShoe.favorites || 0)
  const [isLoading, setIsLoading] = useState(true)
  const { brand, sneakerID } = useParams()
  const SERVER_URL = 'https://sneakers-server.herokuapp.com'

  useEffect(() => {

    axios.get(`${SERVER_URL}/sneakers/shoe/${brand}/${sneakerID}`).then((response, err) => {
        if (err) console.error(err)

        setCurrShoe(...response.data)
        setIsLoading(false)
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sneakerID])

  if (!isLoading) {
    console.log(currShoe)
  }

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const handleFavorite = async () => {
    console.log(currShoe)

    if (currUser && Object.keys(currUser).length > 0) {
      console.log(currUser)
      let favoriteAction = 'increment'

      if (currUser.shoeFavorites && currUser.shoeFavorites.includes(currShoe._id)) {
        favoriteAction = 'decrement'
      }

      const body = {
        action: favoriteAction,
        userID: loggedInUser._id
      }

      const response = await axios.put(`http://localhost:3001/sneakers/shoe/${currShoe.brand.toUpperCase()}/${currShoe.sneakerID}/like`, body)
      const {user, shoe} = response.data
      setFavorites(shoe.favorites)
      setCurrShoe(shoe)
      setCurrUser(user)


      console.log(shoe)
    }
  }
  
  console.log(currShoe)

  return (
    <div>
      {isLoading === false ? (
        <div className="fullSizeShoeContainer">
          <img src={currShoe.image.original} alt={currShoe.name} className="shoeImage"/>

          <div className="shoeDetails">
            <div className="shoeName">
              {currShoe.name}
            </div>

            <div className="shoePrice">
              Price: ${currShoe.retailPrice}
            </div>

            <div>

            </div>

            {currShoe.story ? (
              <div className="shoeStory">
                {currShoe.story}
              </div>
            ) : null}

            <div>
              Brand: {currShoe.brand}
            </div>

            <div>
              Sku: {currShoe.sku}
            </div>

            <div>
              Release Date: {currShoe.releaseDate}
            </div>

            <div>
              Release Year: {currShoe.releaseYear}
            </div>

            <div>
              Colorway: {currShoe.colorway}
            </div>



            <div className="siteLinks">
              {currShoe.links.flightClub !== '' ? (
                <SiteLink link={currShoe.links.flightClub} imgSrc="/assets/flight_club.png" />
              ) : null}

              {currShoe.links.goat !== '' ? (
                <SiteLink link={currShoe.links.goat} imgSrc="/assets/goat.png" />
              ) : null}

              {currShoe.links.stadiumGoods !== '' ? (
                <SiteLink link={currShoe.links.stadiumGoods} imgSrc="/assets/stadium_goods.svg" />
              ) : null}

              {currShoe.links.stockX !== '' ? (
                <SiteLink link={currShoe.links.stockX} imgSrc="/assets/stockx.jpeg" />
              ) : null}
              
            </div>

            <div className="favoritesAndReviewsContainer">
              <div class="favoritesContainer">
                {currUser && currUser.shoeFavorites && currUser.shoeFavorites.includes(currShoe._id) ? (
                  <span>
                    <i class="fas fa-heart" onClick={handleFavorite}></i>
                    <span>{currShoe.favorites}</span>
                  </span>
                ) : (
                  <span>
                    <i class="far fa-heart" onClick={handleFavorite}></i>
                    <span>{currShoe.favorites}</span>
                  </span>
                )}
              </div>

              <div class="reviewsContainer">
                <div class="reviewsText">Reviews ({currShoe.reviews.length})</div>
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                /> 
              </div>
            </div>
            
          </div>
        </div>
      ) : (
        <div>
          Loading...

          Shoe: {currShoe.name}
        </div>
      )}
    </div>
  )
}

export default FullShoe;