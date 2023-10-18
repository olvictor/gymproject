import React from 'react'
import { Routes, Route } from 'react-router-dom'
import  UserPerfil from '../Components/UserPerfil'
import  UserTreino from '../Components/UserTreino'
import  UserDate from  '../Components/UserDate'
import  UserMenu from '../Components/UserMenu'
import  UserPost from '../Components/UserPost'

const Perfil = () => {
  return (
    <div className='container'>
        <UserMenu />
        <Routes>
            <Route path='/' element={<UserPerfil />}></Route>
            <Route path='treino' element={<UserTreino />}></Route>
            <Route path='date' element={<UserDate />}></Route>
            <Route path='post' element={<UserPost />}></Route>

        </Routes>

    </div>
  )
}

export default Perfil