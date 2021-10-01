import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

const SERVER_URL = 'http://localhost:3001'


const RegisterForm = () => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(emailAddress)
    console.log(password)

    const newUser = {
      email: emailAddress,
      password: password
    }

    const data = await axios.post(SERVER_URL + '/register', newUser)
    console.log(data)
  }

  const handleEmailChange = (e) => {
    setEmailAddress(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <form class="registerForm">
      <input type="email" placeholder="Email address" value={emailAddress} onChange={handleEmailChange}/>
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
      <button onClick={handleSubmit}>SIGN UP</button>
    </form>
  )
  
}

export default RegisterForm;