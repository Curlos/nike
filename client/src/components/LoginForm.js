import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

const SERVER_URL = 'http://localhost:3001'


const LoginForm = () => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(emailAddress)
    console.log(password)

    const user = {
      email: emailAddress,
      password: password
    }

    const data = await axios.post(SERVER_URL + '/users/login', user)
    console.log(data)
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
    </form>
  )
  
}

export default LoginForm;