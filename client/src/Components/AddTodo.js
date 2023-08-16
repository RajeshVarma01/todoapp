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
        const res = await axios.get("http://localhost:4000/addtodo", {
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
    await axios.post('http://localhost:4000/add', todos)
    .then((response) => {
      console.log(response)
      navigate('/displaytodo')
    }).catch((err) => {
      console.log("axios err in todo db", err)
    })
  }
  return (
    <div>
      <h1>Write your todo's here...</h1>
      <form className='addtodo-design' >
        <div className='add-todo'>
          <label for="Todo" className='todo-label'>Todo:</label>
          <input type='todo' name='todo' id='todo' onChange={todoChange} className='todo-feild' required/>
        </div>
        <button type='submit' onClick={todoSubmit} className='submit-btn'>Submit</button><span><Link to={'/login'} className='link-btn'>GO BACK</Link></span>
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
