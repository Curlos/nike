import React, { useState } from 'react'
import { Link } from "react-router-dom";

const ThumbnailShoe = ({ shoeObj, handleSelectShoe }) => {

  const handleClick = () => {
    handleSelectShoe(shoeObj)
  }
  return (
    <div class="thumbnailShoe">
      <Link to={`/shoe/${shoeObj.brand}/${shoeObj.sneakerID}`} onClick={handleClick}>
        <img src={shoeObj.image.thumbnail} alt={shoeObj.name} />
        <div className="name">{shoeObj.name}</div>
        <div className="price">{shoeObj.retailPrice ? '$' + shoeObj.retailPrice : 'Unknown Price'}</div>
      </Link>
    </div>
  )
}

export default ThumbnailShoe;