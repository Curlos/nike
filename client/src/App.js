import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar'
import Shoes from './components/Shoes'
import FullShoe from './components/FullShoe'
import Brands from './components/Brands'
import './style.scss';

const App = () => {

  const [selectedShoe, setSelectedShoe] = useState({})
  const [finalizedSearchQuery, setFinalizedSearchQuery] = useState('')
  const [brands, setBrands] = useState({})
  const [sortType, setSortType] = useState('Newest')
  const [shoeCount, setShoeCount] = useState(0)
  const [lastFilterChange, setLastFilterChange] = useState({})
  const [filters, setFilters] = useState({
    'priceRanges': {'$0 - $50': {min: 0, max: 50, checked: false}, '$50 - $100': {min: 50, max: 100, checked: false}, '$100 - $150': {min: 100, max: 150, checked: false}, 'Over $150': {min: 150, checked: false}},
    
    'colors': {'black': false, 'blue': false, 'brown': false, 'green': false, 'grey': false, 'multi-color': false, 'orange': false, 'pink': false, 'purple': false, 'red': false, 'white': false, 'yellow': false},

    'name': ''
  })

  console.log(filters)

  const handleSelectShoe = (shoeObj) => {
    setSelectedShoe(shoeObj)
  }

  const handleSelectBrand = (newBrand) => {
    setBrands({...brands, [newBrand.name]: {...newBrand}})
    setLastFilterChange({...newBrand})
    console.log(brands)
    console.log(newBrand)
  }

  const clearLastFilterChange = () => {
    setLastFilterChange('')
  } 

  const handleSearch = (searchQuery) => {
    console.log(searchQuery)
    setFinalizedSearchQuery(searchQuery)
    setFilters({...filters, name: finalizedSearchQuery})
  }

  const handleFilterChange = (filterType, newFilterValue) => {
    setFilters({...filters, [filterType]: newFilterValue})

    console.log(filters)
  }

  const handleShoeCount = (newShoeCount) => {
    setShoeCount(newShoeCount)
  }

  const resetFinalizedSearchQuery = () => {
    setFinalizedSearchQuery('')
  }

  const handleSort = (newSortType) => {
    console.log(newSortType)
    setSortType(newSortType)
  }

  return (

    <Router>
      <div>
        <Navbar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/new-releases" exact>
            New Releases
          </Route>
          <Route path="/men" exact>
            Men
          </Route>
          <Route path="/women" exact>
            Women
          </Route>
          <Route path="/kids" exact>
            Kids
          </Route>

          <Route path="/brands" exact>
            <Brands />
          </Route>
          
          <Route path="/shoes" exact>
            <Shoes brands={brands} handleSearch={handleSearch} finalizedSearchQuery={finalizedSearchQuery} resetFinalizedSearchQuery={resetFinalizedSearchQuery} handleSelectShoe={handleSelectShoe} handleSelectBrand={handleSelectBrand} filters={filters} lastFilterChange={lastFilterChange} clearLastFilterChange={clearLastFilterChange} handleSort={handleSort} sortType={sortType} handleFilterChange={handleFilterChange} shoeCount={shoeCount} handleShoeCount={handleShoeCount}/>
          </Route>

          <Route path="/shoe/:brand/:sneakerID" exact>
            <FullShoe shoeObj={selectedShoe.sneakerID}/>
          </Route>

          <Route path="/">
            Home
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
