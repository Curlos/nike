import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const LandingPage = () => {

  return (
    <div className="landingPage">
      <div>
        <div className="shoeTitle">Nike Dunk SB High RX-0 Unicorn Gundam</div>
        <div className="shoeStory">The Gundam x Nike Dunk High SB ‘RX-0 Project Unicorn’ is taken from a collaborative series celebrating the Tokyo 2021 Summer Olympics.</div>
        <Link to="/shoes" className="shopNowButton">Shop now</Link>
      </div>
      <div className="shoeImage">
        <img src="/assets/shoe.png" alt="Nike SB Dunk High Gundam" className="landingPageShoe"/>
      </div>
      
    </div>
  )
}

export default LandingPage;