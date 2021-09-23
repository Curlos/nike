import React, { useState } from 'react'
import { Link } from "react-router-dom";

const ThumbnailShoe = ({ shoeObj, handleSelectShoe }) => {

  const handleClick = () => {
    handleSelectShoe(shoeObj)
  }
  return (
    <div class="singleShoeContainer">
      <Link to={`/shoe/${shoeObj.brand}/${shoeObj.sneakerID}`} onClick={handleClick}>
        <img src={shoeObj.image.thumbnail} alt={shoeObj.name} />
        <div>{shoeObj.name}</div> 
      </Link>
    </div>
  )
}

export default ThumbnailShoe;