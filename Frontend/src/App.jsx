import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './globals/Navbar'
import CreateToDo from './pages/CreateTodo'


function App() {

  return (
    <>
    <BrowserRouter>
        <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/createTodo' element={<CreateToDo/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
