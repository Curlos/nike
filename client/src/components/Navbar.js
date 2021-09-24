import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Shoes from './Shoes'


const Navbar = () => {

  return (

    <nav className="navbar">
          <ul>
            <li>
              <Link to="/">
                <img src="/assets/jordan.svg" alt="Site logo"/>
              </Link>
            </li>

            <div className="navRight">
              <li>
                <Link to="/shoes">Shoes</Link>
              </li>

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
  )
}

export default Navbar;