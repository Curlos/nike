import React, { useState } from 'react'

const Dropdown = () => {

  const [showDropdown, setShowDropdown] = useState(true)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  return (
    <div class="dropdown">
      <button className="dropbtn" onClick={toggleDropdown}>Sort by</button>
      {showDropdown ? (
        <div className="dropdown-content">
          <a href="#">Newest</a>
          <a href="#">Price: Highest to Lowest</a>
          <a href="#">Price: Lowest to Highest</a>
        </div>
      ) : null}
    </div>
  )
}

export default Dropdown;