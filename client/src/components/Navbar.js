import React, { } from 'react';
import { Link } from "react-router-dom";
import UserContext from '../contexts/UserContext';


const Navbar = () => {

  const { loggedInUser, setLoggedInUser } = React.useContext(UserContext)

  console.log(loggedInUser)

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

              <li>
                {loggedInUser && Object.keys(loggedInUser).length > 0 ? (
                  <span>
                    Hi, {loggedInUser.firstName || loggedInUser.email} 
                    <i class="fas fa-user"></i>
                  </span>
                ): (
                  <Link to="/login">Log In</Link>
                )}
              </li>
            </div>
          </ul>
        </nav>
  )
}

export default Navbar;