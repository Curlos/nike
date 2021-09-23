import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar'
import Shoes from './components/Shoes'
import FullShoe from './components/FullShoe'
import Brands from './components/Brands'
import SearchBar from './components/SearchBar'
import axios from 'axios'
import './style.scss';

const App = () => {

  const [selectedShoe, setSelectedShoe] = useState({})
  const [selectedBrand, setSelectedBrand] = useState('')
  const [finalizedSearchQuery, setFinalizedSearchQuery] = useState('')
  const [filters, setFilters] = useState({})

  const handleSelectShoe = (shoeObj) => {
    setSelectedShoe(shoeObj)
  }

  const handleSearch = (searchQuery) => {
    console.log(searchQuery)
    setFinalizedSearchQuery(searchQuery)
    setFilters({...filters, name: finalizedSearchQuery})
  }

  const resetFinalizedSearchQuery = () => {
    setFinalizedSearchQuery('')
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
          
          <Route path="/brands/:brand" exact>
            <SearchBar handleSearch={handleSearch}/>
            <Shoes finalizedSearchQuery={finalizedSearchQuery} resetFinalizedSearchQuery={resetFinalizedSearchQuery} handleSelectShoe={handleSelectShoe}/>
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
