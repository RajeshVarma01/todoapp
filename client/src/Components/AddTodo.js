import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const GetToken = () => {
  const location = useLocation()
  const navigate = useNavigate()
  // console.log(location, "this is location")
  const [token, setToken] = useState(location.state)
  console.log("Token", token)
  const getTodoData = async () => {
    try {
      if (token === null) {
        navigate("/login")
      } else {
        const res = await axios.get("https://todo-app-xj31.onrender.com/addtodo", {
          headers: {
            "X-Token": token
          }
        })
        console.log(res)
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getTodoData()
  }, [token])
  //taking one more usestate for posting todos into tododb 
  const [todos, setTodos] = useState({
    todo: ''
  })
  const todoChange = (e) => {
  const obj = {...todos, [e.target.name]:e.target.value}
  setTodos(obj)
  }
  const todoSubmit = async (e) => {
    e.preventDefault()
    await axios.post('https://todo-app-xj31.onrender.com/add', todos)
    .then((response) => {
      console.log(response)
      navigate('/displaytodo')
    }).catch((err) => {
      console.log("axios err in todo db", err)
    })
  }
  return (
    <div className='addtodo-fullpage'>
      <form className='addtodo-design'>
      <h1>Write your todo's here...</h1>
          <input type='todo' name='todo' id='todo' onChange={todoChange} className='todo-feild-new' required/>
        <br/>
        <br/>
        <button type='submit' onClick={todoSubmit} className='submit-btn'>Submit</button>
        <Link to={'/login'} className='link-btn'>GO BACK</Link>
      </form>
      </div>  
  )
  }

export default GetToken

//for adding todos into todo schema from client/frontend

// const AddTodo = () => {
//   const [todos, setTodos] = useState({
//     todo:''
//   })
// const todoChange = (e) => {
//   const obj = {...todos, [e.target.name]:e.target.value}
//   setTodos(obj)
// }
// const todoSubmit = () => {

// }
// return(
//   <div>
//     <h1>Add Todo here</h1>
//   </div>
// )
// }
