import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

const SERVER_URL = 'http://localhost:3001'


const RegisterForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(emailAddress)
    console.log(password)

    const newUser = {
      email: emailAddress,
      password: password,
      firstName: firstName,
      lastName: lastName
    }

    const data = await axios.post(SERVER_URL + '/users/register', newUser)
    console.log(data)
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmailAddress(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <form class="registerForm">
      <input type="text" placeholder="First name" value={firstName} onChange={handleFirstNameChange}/>
      <input type="text" placeholder="Last name" value={lastName} onChange={handleLastNameChange}/>
      <input type="email" placeholder="Email address" value={emailAddress} onChange={handleEmailChange}/>
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
      <button onClick={handleSubmit}>SIGN UP</button>
    </form>
  )
  
}

export default RegisterForm;