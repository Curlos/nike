import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import UserContext from '../contexts/UserContext';

const ThumbnailShoe = ({ shoeObj, handleSelectShoe }) => {

  const { loggedInUser } = React.useContext(UserContext)
  const [favorites, setFavorites] = useState(shoeObj.favorites || 0)
  const [currShoe, setCurrShoe] = useState(shoeObj)
  const [currUser, setCurrUser] = useState(loggedInUser)

  useEffect(() => {

  })

  const handleClick = () => {
    handleSelectShoe(currShoe)
  }

  const handleFavorite = async () => {
    console.log(currShoe)

    if (currUser && Object.keys(currUser).length > 0) {
      console.log(currUser)
      let favoriteAction = 'increment'

      if (currUser.shoeFavorites && currUser.shoeFavorites.includes(shoeObj._id)) {
        favoriteAction = 'decrement'
      }

      const body = {
        action: favoriteAction,
        userID: loggedInUser._id
      }

      const response = await axios.put(`http://localhost:3001/sneakers/shoe/${shoeObj.brand.toUpperCase()}/${shoeObj.sneakerID}/like`, body)
      const {user, shoe} = response.data
      setFavorites(shoe.favorites)
      setCurrShoe(shoe)
      setCurrUser(user)


      console.log(shoe)
    }
  }

  return (
    <div class="thumbnailShoe">
      <Link to={`/shoe/${currShoe.brand}/${currShoe.sneakerID}`} onClick={handleClick}>
        <img src={currShoe.image.thumbnail} alt={currShoe.name} />
        <div className="name">{currShoe.name}</div>
        <div className="price">{currShoe.retailPrice ? '$' + currShoe.retailPrice : 'Unknown Price'}</div>
      </Link>
      
      {currUser.shoeFavorites && currUser.shoeFavorites.includes(currShoe._id) ? (
        <span>
          <i class="fas fa-heart" onClick={handleFavorite}></i>
          <span>{favorites}</span>
        </span>
      ) : (
        <span>
          <i class="far fa-heart" onClick={handleFavorite}></i>
          <span>{favorites}</span>
        </span>
      )}
    </div>
  )
}

export default ThumbnailShoe;