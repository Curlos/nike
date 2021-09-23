import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar'
import Shoes from './components/Shoes'
import FullShoe from './components/FullShoe'
import './style.scss';

function App() {

  const [selectedShoe, setSelectedShoe] = useState({})

  const handleSelectShoe = (shoeObj) => {
    setSelectedShoe(shoeObj)
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
            Explore Brands
          </Route>
          <Route path="/brands/:brand" exact>
            <Shoes handleSelectShoe={handleSelectShoe}/>
          </Route>

          <Route path="/shoe/:id" exact>
            <FullShoe shoeObj={selectedShoe}/>
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
