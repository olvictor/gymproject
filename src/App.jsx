import React from 'react'
import Header from './Components/Header'
import Home from './Pages/Home'
import Login from './Pages/Login'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {

  return (
      <div> 
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
