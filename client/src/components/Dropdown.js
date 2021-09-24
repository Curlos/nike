import React, { useState } from 'react'

const Dropdown = ({ handleSort }) => {

  const [showDropdown, setShowDropdown] = useState(true)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }
  
  const handleClick = (e) => {
    const newSortType = e.target.getAttribute('value')
    handleSort(newSortType)
  }

  return (
    <div class="dropdown">
      <button className="dropbtn" onClick={toggleDropdown}>
        Sort By {showDropdown ? (
          <i class="fas fa-chevron-down"></i>
        ) : (
          <i class="fas fa-chevron-up"></i>
        )}
      </button>
      {showDropdown ? (
        <div className="dropdown-content">
          <div onClick={handleClick} value="Newest">Newest</div>
          <div onClick={handleClick} value="highestToLowest">Price: Highest to Lowest</div>
          <div onClick={handleClick} value="lowestToHighest">Price: Lowest to Highest</div>
        </div>
      ) : null}
    </div>
  )
}

export default Dropdown;