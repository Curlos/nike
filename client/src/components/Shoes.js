import React, { useState, useEffect } from 'react'
import ThumbnailShoe from './ThumbnailShoe'
import Sidebar from './Sidebar'
import SearchBar from './SearchBar'
import Dropdown from './Dropdown'
import axios from 'axios'

const Shoes = ({ brands, handleSearch, finalizedSearchQuery, resetFinalizedSearchQuery, handleSelectShoe, handleSelectBrand, lastFilterChange, clearLastFilterChange, handleSort, sortType, handleFilterChange, filters, shoeCount, handleShoeCount }) => {

  const [shoes, setShoes] = useState([])
  const [allShoes, setAllShoes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const SERVER_URL = 'https://sneakers-server.herokuapp.com'

  console.log(shoes)
  console.log(brands)
  

  useEffect(() => {
    // Every time the brand name changes, reset the search query
    resetFinalizedSearchQuery()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brands])

  useEffect(() => {
    let newShoes = [...shoes]
    setShoes(sortedShoes(newShoes))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType])

  useEffect(() => {

    // Every time a new search is submitted, filter shoes based on the query
    console.log(lastFilterChange)
    console.log(finalizedSearchQuery)

    const fetchFromServer = async () => {
      if (finalizedSearchQuery === '') {
        if (lastFilterChange !== '' && lastFilterChange.checked === true) {
          const response = await axios.get(`${SERVER_URL}/sneakers/brands/${lastFilterChange.name.toUpperCase()}`)
          const data = response.data
          console.log(data)
          const newShoes = [...shoes]
          const newAllShoes = [...shoes]
          newShoes.push(...data)
          newAllShoes.push(...data)

          handleShoeCount(Object.keys(newShoes).length)

          setShoes(sortedShoes(newShoes))
          setAllShoes(newAllShoes)
          setIsLoading(false) 
        } else if (lastFilterChange !== '' && lastFilterChange.checked === false) {
          console.log('unchecked')
          const newShoes = filterOutShoes({brand: lastFilterChange.name})
          handleShoeCount(Object.keys(newShoes).length)
          setShoes(sortedShoes(newShoes))
          setAllShoes(newShoes)
        } else {
          // fetch all shoes
          const newShoes = []
          const newAllShoes = []

          for (const brand of Object.keys(brands)) {
            if (brands[brand].checked === true) {
              const response = await axios.get(`${SERVER_URL}/sneakers/brands/${brands[brand].name.toUpperCase()}`)
              const data = response.data
              console.log(data)
              newShoes.push(...data)
              newAllShoes.push(...data)
              console.log(newShoes)
            } 
          }

          handleShoeCount(Object.keys(newShoes).length)

          setShoes(sortedShoes(newShoes))
          setAllShoes(newAllShoes)
          setIsLoading(false)
          console.log(newShoes)
        }

        clearLastFilterChange()
      } else {
        const filters = {
          "name": finalizedSearchQuery
        }

        const newShoes = filterShoes(filters)
        console.log(newShoes)

        handleShoeCount(Object.keys(newShoes).length)

        setShoes(newShoes)
        setIsLoading(false)
      }
    }
    fetchFromServer()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalizedSearchQuery, brands])

  const sortedShoes = (shoesToSort) => {
    let newShoes = [...shoesToSort]
    
    switch (sortType) {
      case 'Newest':
        newShoes = sortShoesByRelease(newShoes)
        break
      case 'highestToLowest':
        newShoes = sortShoesFromHighestToLowestPrice(newShoes)
        break
      case 'lowestToHighest':
        newShoes = sortShoesFromLowestToHighestPrice(newShoes)
        break
      default:
        return
    }

    return newShoes
  }

  const filterOutShoes = (filters) => {
    const newShoes = allShoes.filter((shoe) => {
      for (let prop of Object.keys(filters)) {
        console.log(`${shoe[prop]} === ${filters[prop]} ${shoe[prop] === filters[prop]}`)
        if (shoe[prop].toLowerCase() === filters[prop].toLowerCase()) {
          return false
        }
      }
      return true
    })

    return newShoes
  }

  const filterShoes = (filters) => {
    console.log(filters)
    const newShoes = allShoes.filter((shoe) => {
      for (let prop of Object.keys(filters)) {
        console.log(`${shoe[prop]} === ${filters[prop]} ${shoe[prop] === filters[prop]}`)
        
        if (prop === 'name' && shoe[prop].toLowerCase().includes(filters[prop].toLowerCase()) === false) {
          console.log()
          return false
        } else if (prop !== 'name' && shoe[prop].toLowerCase() !== filters[prop].toLowerCase()) {
          return false
        }
      }
      return true
    })

    return newShoes
  }

  const sortShoesByRelease = (newShoes) => {
    return newShoes.sort((a, b) => {
      if (a.releaseYear < b.releaseYear) {
        return 1
      } else if (new Date(a.releaseDate) < new Date(b.releaseDate)) {
        return 1
      } else {
        return -1
      }
    })
  }

  const sortShoesFromHighestToLowestPrice = (newShoes) => {
    return newShoes.sort((a, b) => (a.retailPrice < b.retailPrice) ? 1 : -1)
  }

  const sortShoesFromLowestToHighestPrice = (newShoes) => {
    return newShoes.sort((a, b) => (a.retailPrice > b.retailPrice) ? 1 : -1)
  }


  return (

    <div>
      <div className="shoesHeader">
        <div class="shoesCount">Shoes ({shoeCount})</div>
        <div class="searchAndFilterElems">
          <SearchBar handleSearch={handleSearch} shoeCount={shoeCount}/>
          <Dropdown handleSort={handleSort}/>
        </div>
      </div>

      <div className="shoesPage">
        <Sidebar handleSelectBrand={handleSelectBrand} brands={brands} handleFilterChange={handleFilterChange} filters={filters}/>

        <div className="shoesContainer">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            shoes.map((shoeObj) => {
            return (
              <ThumbnailShoe key={shoeObj.sneakerID} shoeObj={shoeObj} handleSelectShoe={handleSelectShoe}/>
            )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default Shoes;