import React, { } from 'react'
import { Link } from "react-router-dom";

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

const Brands = () => {

  const getBrandImgSrc = (brand) => {
    switch (brand) {
      case 'YEEZY':
        return `/assets/brand_logos/yeezy.png`
      case 'COMMON PROJECTS':
        return `/assets/brand_logos/common projects.jpeg`
      default:
        return `/assets/brand_logos/${brand.toLowerCase()}.svg`
    }
  }
  


  return (
    <div className="brandsContainer">
      <div className="brandsTitle">BRANDS</div>
      <div className="brandsLogos">
        {ALL_BRANDS.map((brand) => {
          return (
            <span class="brandContainer">
              <Link to={`/brands/${brand}`}>
                <img src={getBrandImgSrc(brand)} alt={`${brand} logo`} className="brandLogo"/>
              </Link>
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default Brands;