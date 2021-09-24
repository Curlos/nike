import React, { useState } from 'react'

const SearchBar = ({ handleSearch }) => {

  const [searchQuery, setSearchQuery] = useState('')


  const handleChange = (e) => {
    const newSearchQuery = e.target.value
    setSearchQuery(newSearchQuery)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(searchQuery)
    setSearchQuery('')
  }

  return (
    <form className="searchBarContainer" onSubmit={handleSubmit}>
      <input type="text" className="searchInput" value={searchQuery} onChange={handleChange}/>
      <button type="submit" onClick={handleSubmit} className="searchButton">
        <i class="fas fa-search"></i>
      </button>
    </form>
  )
}

export default SearchBar;