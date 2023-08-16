import React, { useState } from 'react'
// import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi } from '../Axios/userApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const navigate = useNavigate()
  const[formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onRegisterUser = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData((values) => ({...values, [name]:value}))
  }
  const onLoginUser = async () => {
    try{
      const res = await loginApi(formData)
      console.log("this is res", res)
      const tokenObj = res.data.token
      if(tokenObj){
        navigate("/addtodo", {state:tokenObj})
      }else{
        navigate("/login", {state: null})
        // return alert("login details incorrect")
      }
    }catch(e){
      console.log(e)
      toast("Login details incorrect")
    }
  }

  //on form submit
  const onUserDataSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='login-page'>
      <h1>LOGIN HERE...✅</h1>
      <form className='form-design' onSubmit={onUserDataSubmit}>
        <div className='login-email'>
          <label for="Email" className='email-label'>Email:</label>
          <input type='email' name='email' id='email' onChange={onRegisterUser} className='form-controlone' required/>
        </div>
        <div className='login-password'>
          <label for="Password" className='password-label'>Password:</label>
          <input type='password' name='password' id='password' onChange={onRegisterUser} className='form-controltwo' required/>
        </div>
        <button type='submit' onClick={onLoginUser} className='submit-btn'>Submit</button>
      </form>
      <Link to={'/list'} className='link-btn'>🏛️</Link>
      <ToastContainer />
    </div>
  )
}

export default Login
