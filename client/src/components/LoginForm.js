import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import UserContext from '../contexts/UserContext';

const SERVER_URL = 'http://localhost:3001'


const LoginForm = () => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const { loggedInUser, setLoggedInUser } = React.useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(emailAddress)
    console.log(password)

    const user = {
      email: emailAddress,
      password: password
    }

    const response = await axios.post(SERVER_URL + '/users/login', user)
    console.log(response.data.user)
    setLoggedInUser(response.data.user)
  }

  const handleEmailChange = (e) => {
    setEmailAddress(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <form class="loginForm">
      <input name="email" type="email" placeholder="Email address" value={emailAddress} onChange={handleEmailChange}/>
      <input name="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
      <button onClick={handleSubmit}>SIGN IN</button>
      <span>Not a member? <Link to="/register">Register here</Link></span>
    </form>
  )
  
}

export default LoginForm;