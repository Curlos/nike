import React, { useState, useEffect } from 'react'

const ALL_BRANDS = [
  "AIR JORDAN",
  "ADIDAS",
  "ALEXANDER MCQUEEN",
  "ASICS",
  "BALENCIAGA",
  "BURBERRY",
  "CHANEL",
  "COMMON PROJECTS",
  "CONVERSE",
  "CROCS",
  "DIADORA",
  "DIOR",
  "GUCCI",
  "JORDAN",
  "LI-NING",
  "LOUIS VUITTON",
  "NEW BALANCE",
  "NIKE",
  "OFF-WHITE",
  "PRADA",
  "PUMA",
  "REEBOK",
  "SAINT LAURENT",
  "SAUCONY",
  "UNDER ARMOUR",
  "VANS",
  "VERSACE",
  "YEEZY",
]

const titleCase = (str) => {

  if(str.includes('-')) {
    return str.split('-')
    .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join('-')
  }

  return str.split(' ')
  .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
  .join(' ')
}

const Sidebar = ({ handleSelectBrand }) => {


  const handleClick = (e) => {
    const newBrandName = e.target.value
    const checked = e.target.checked
    const newBrand = {name: newBrandName, checked: checked}
    handleSelectBrand(newBrand)
  }


  return (
    <div class="sidebar">
      <div>Brands</div>
      {ALL_BRANDS.map((brand) => {
        return (
          <a>
            <input type="checkbox" name={titleCase(brand)} onClick={handleClick} value={titleCase(brand)}/>
            <label for={titleCase(brand)}>{titleCase(brand)}</label>
          </a>
        )
      })}


      
    </div>
  )
}

export default Sidebar;