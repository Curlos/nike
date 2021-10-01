import React, { } from 'react'

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

const PRICE_RANGES = [
  { stringRange: "$0 - $50", min: 0, max: 50 }, 
  { stringRange: "$50 - $100", min: 50, max: 100 },
  { stringRange: "$100 - $150", min: 100, max: 150 },
  { stringRange: "Over $150", min: 150 },
]

const COLORS = ['black', 'blue', 'brown', 'green', 'grey', 'multi-color', 'orange', 'pink', 'purple', 'red', 'white', 'yellow']

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

const Sidebar = ({ handleSelectBrand, brands, handleFilterChange, filters }) => {


  const handleBrandClick = (e) => {
    const newBrandName = e.target.value
    const checked = e.target.checked
    const newBrand = {name: newBrandName, checked: checked}
    console.log(brands)
    handleSelectBrand(newBrand)
  }

  const handlePriceClick = (e) => {
    const stringRange = e.target.name

    const newPriceRange = {...filters['priceRanges'][stringRange], checked: !filters['priceRanges'][stringRange].checked}

    handleFilterChange('priceRanges', {...filters['priceRanges'], [stringRange]: newPriceRange})
  }

  const handleColorClick = (e) => {
    const color = e.target.name.toLowerCase()

    handleFilterChange('colors', {...filters['colors'], [color]: !filters['colors'][color]})
  }


  return (
    <div class="sidebar">
      <div class="sidebarCategoryTitle">Brands</div>
      {ALL_BRANDS.map((brand) => {
        return (
          <a href="/">
            <input type="checkbox" name={titleCase(brand)} onClick={handleBrandClick} value={titleCase(brand)} checked={brands[titleCase(brand)] && brands[titleCase(brand)].checked}/>
            <label for={titleCase(brand)}>{titleCase(brand)}</label>
          </a>
        )
      })}

      <div class="line-separator"></div>
      <div class="sidebarCategoryTitle">Prices</div>

      {PRICE_RANGES.map((priceRange) => {

       return (
        <a href="/">
          <input type="checkbox" name={priceRange.stringRange} onClick={handlePriceClick} minPrice={priceRange.min} maxPrice={priceRange.max} checked={filters['priceRanges'][priceRange.stringRange].checked} />
          <label for={priceRange.stringRange}>{priceRange.stringRange}</label>
        </a>
       )
      })}

      <div class="line-separator"></div>
      <div class="sidebarCategoryTitle">Colors</div>

      {COLORS.map((color) => {
        return (
          <a href="/">
            <input type="checkbox" name={titleCase(color)} onClick={handleColorClick} value={color} checked={filters['colors'][color]} />
            <label for={titleCase(color)}>{titleCase(color)}</label>
          </a>
        )
      })}

      
    </div>
  )
}

export default Sidebar;