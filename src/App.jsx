import React from 'react'
import Header from './Components/Header'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Perfil from './Pages/Perfil'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserStorage } from './UserContext'
const App = () => {

  return (
      <> 
        <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login/*' element={<Login />} />
            <Route path='/user/*' element={<Perfil />} />
          </Routes>
        </UserStorage>
        </BrowserRouter>
      </>
  )
}

export default App
