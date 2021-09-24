import React, { useState, useEffect } from 'react'
import ThumbnailShoe from './ThumbnailShoe'
import Sidebar from './Sidebar'
import axios from 'axios'

const Shoes = ({ brands, finalizedSearchQuery, resetFinalizedSearchQuery, handleSelectShoe, handleSelectBrand, lastFilterChange }) => {

  const [shoes, setShoes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  console.log(shoes)
  console.log(brands)
  

  useEffect(() => {
    // Every time the brand name changes, reset the search query
    resetFinalizedSearchQuery()
  }, [brands])

  useEffect(() => {

    // Every time a new search is submitted, filter shoes based on the query
    console.log(lastFilterChange)
    console.log(finalizedSearchQuery)

    const fetchFromServer = async () => {
      if (finalizedSearchQuery === '') {
        if (lastFilterChange.checked === true) {
          const response = await axios.get(`http://localhost:3001/sneakers/brands/${lastFilterChange.name.toUpperCase()}`)
          const data = response.data
          console.log(data)
          const newShoes = [...shoes]
          newShoes.push(...data)
          // sortShoesByRelease(newShoes)
          sortShoesFromLowestToHighestPrice(newShoes)

          setShoes(newShoes)
          setIsLoading(false) 
        } else {
          console.log('unchecked')
          const newShoes = filterOutShoes({brand: lastFilterChange.name})
          // sortShoesByRelease(newShoes)
          sortShoesFromLowestToHighestPrice(newShoes)
          setShoes(newShoes)
        }
      } else {
        const filters = {
          "name": finalizedSearchQuery
        }

        const newShoes = filterShoes(filters)
        console.log(newShoes)

        setShoes(newShoes)
        setIsLoading(false)
      }
    }
    fetchFromServer()
  }, [finalizedSearchQuery, brands])

  const filterOutShoes = (filters) => {
    const newShoes = shoes.filter((shoe) => {
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
    const newShoes = shoes.filter((shoe) => {
      for (let prop of Object.keys(filters)) {
        console.log(`${shoe[prop]} === ${filters[prop]} ${shoe[prop] === filters[prop]}`)
        if (prop === 'name' && !shoe[prop].includes(filters[prop])) {
          return false
        } else if (shoe[prop].toLowerCase() !== filters[prop].toLowerCase()) {
          return false
        }
      }
      return true
    })

    console.log(newShoes)

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

    <div className="shoesPage">
      <Sidebar handleSelectBrand={handleSelectBrand}/>

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
  )
}

export default Shoes;