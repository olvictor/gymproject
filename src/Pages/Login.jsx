import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginForm from '../Components/LoginForm'
import RegistroForm from '../Components/RegistroForm'

const Login = () => {
  return (
    <div>
        <p>teste</p>
        <Routes>
          <Route path='/' element={<LoginForm />}></Route>
          <Route path='registrar' element={<RegistroForm />}></Route>
        </Routes>
    </div>
  )
}

export default Login