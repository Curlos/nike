import React, {  } from 'react'
import { Link } from "react-router-dom";

const Brand = ({ shoeObj, handleSelectBrand }) => {

  const handleClick = () => {
    handleSelectBrand(shoeObj)
  }
  return (
    <div class="singleShoeContainer">
      <Link to={`/brands`} onClick={handleClick}>
        <img src={shoeObj.image.thumbnail} alt={shoeObj.name} />
        <div>{shoeObj.name}</div> 
      </Link>
    </div>
  )
}

export default Brand;