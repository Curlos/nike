import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const Navbar = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">
                <img src="/assets/jordan.svg" alt="Site logo"/>
              </Link>
            </li>

            <div className="navRight">
              <li>
                <Link to="/new-releases">New Releases</Link>
              </li>

              <li>
                <Link to="/men">Men</Link>
              </li>

              <li>
                <Link to="/women">Women</Link>
              </li>

              <li>
                <Link to="/kids">Kids</Link>
              </li>

              <li>
                <Link to="/brands">Explore Brands</Link>
              </li>
            </div>
          </ul>
        </nav>

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
          <Route path="/">
            Sneakers Home
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default Navbar;