import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './globals/Navbar'
import CreateToDo from './pages/CreateTodo'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import SingleTodo from './pages/SingleTodo'
import ProtectedRoutes from './ProtectedRoutes'

function App() {

  return (
    //protected routing 
    //if not login vana redirect to the login pages instead of open the blank browser window

    <>
    <BrowserRouter>
        <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/createTodo' element={<CreateToDo/>} />
        {/* single pages */}
         <Route path='/singleTodo/:id' element={<ProtectedRoutes><SingleTodo/></ProtectedRoutes>} />  
        <Route path='/profile' element={<Profile/>} />
        <Route path='/editProfile/:id' element={<EditProfile/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
