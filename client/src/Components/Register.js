import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const navigate = useNavigate()
  const [addition, setAddition] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  })
  // const handleRegister = async (e) => {
  //   const obj = {...addition,[e.target.name]:e.target.value}
  //   setAddition(obj)
  //  }
  const handleRegister = (e) => {
    const name = e.target.name
    const value = e.target.value
    setAddition((values) => ({ ...values, [name]: value }))
    console.log(addition)
  }
  const handleRegisterSubmit = async (e) => {
    console.log(addition)
    e.preventDefault()
    await axios.post('https://todo-app-xj31.onrender.com/register', addition)
      .then((response) => {
        console.log(response)
        navigate('/login')
        toast("Registered Successfully")
      }).catch((err) => {
        console.log("axios err", err)
      })
  }
  return (
    <div className='register-page'>
      <h1>COMPLETE YOUR REGISTRATION HERE✅</h1>
      <form className='form-design-new'>
        <div className='register-form'>
          <label for="Name" className='form-label'>Name:</label>
          <input type='name' name='name' onChange={handleRegister} className='form-control' required />
        </div>
        <div className='register-form'>
          <label for="Email" className='form-label'>Email:</label>
          <input type='email' name='email' onChange={handleRegister} className='form-control' required />
        </div>
        <div className='register-form'>
          <label for="Password" className='form-label'>Password:</label>
          <input type='password' name='password' onChange={handleRegister} className='form-control' required />
        </div>
        <div className='register-form'>
          <label for="confirmPassword" className='form-label'>confirmPassword:</label>
          <input type='password' name='confirmpassword' onChange={handleRegister} className='form-control' required />
        </div>
        <button type='submit' onClick={handleRegisterSubmit} className='submit-btn'>Submit</button>
        <Link to={'/list'} className='link-btn'>🏛️</Link>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Register
