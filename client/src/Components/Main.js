import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import AddTodo from './AddTodo'
import EditTodo from './EditTodo'
import Login from './Login'
import Register from './Register'
import DisplayTodo from './DisplayTodo'

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/list' element={<Home/>}/>
        <Route path='/addtodo' element={<AddTodo/>}/>
        <Route path='/update/:id' element={<EditTodo/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/displaytodo' element={<DisplayTodo/>}/>
      </Routes>
    </div>
  )
}

export default Main
