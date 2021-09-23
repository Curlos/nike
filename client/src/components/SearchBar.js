import React, { useState, useEffect } from 'react'

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
      <input type="submit" value="Search" onClick={handleSubmit}/>
    </form>
  )
}

export default SearchBar;