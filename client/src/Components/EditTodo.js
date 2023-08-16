import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditTodo = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [editTodo, setEditTodo] = useState({
    todo:''
  })
  const Api = async () => {
    await axios.get(`http://localhost:4000/update/${id}`)
    .then((response) => {
      console.log(response.data)
      const values = response.data
      setEditTodo(values)
    }).catch((err) => {
      console.log("inside err",err)
    })
  }
  useEffect(() => {
    Api()
  },[])
  const handleEditChange = (e) => {
    const obj = {...editTodo, [e.target.name]: e.target.value}
    setEditTodo(obj)
  }
  const handleEditSubmit = async (e) => {
    try{
      e.preventDefault()
    const editedData =   await axios.patch(`http://localhost:4000/update/${id}`, editTodo)
    console.log(editedData)
      navigate('/displaytodo')
    }catch(e){
      console.log(e)
    }

  }
  return (
    <div>
          <h1>Edit your todo's here...</h1>
          <form className='addtodo-design' >
            <div className='add-todo'>
              <label for="TODO" className='todo-name'>TODO:</label>
              <input type='text' name='todo' onChange={handleEditChange} id='todo' className='todo-nameone' value={editTodo.todo} required/>
            </div>
            <button type='submit' onClick={handleEditSubmit} className='submit-btn'>Submit</button>
          </form>
    </div>
  )
}

export default EditTodo
