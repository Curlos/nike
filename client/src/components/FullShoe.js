import React, { useState } from 'react'
import { Link } from "react-router-dom";

const FullShoe = ({ shoeObj }) => {
  if (!shoeObj) {
    return
  }

  return (
    <div className="fullSizeShoeContainer">
      <img src={shoeObj.image.original} alt={shoeObj.name} className="shoeImage"/>
      <div className="shoeName">{shoeObj.name}</div>
    </div>
  )
}

export default FullShoe;