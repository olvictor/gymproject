import React, { createContext, useState } from 'react'
import {  getToken, userLogin } from './CustomHooks/UseFetch'
import { useNavigate } from 'react-router-dom'

export const UserContext = createContext()

export const UserStorage = ({children}) => {
    const [logado, setLogado] = useState(false)
    const [data, setData] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const getUser = async (token) =>{
       const {url,options} = getToken(token)
       const response = await fetch(url,options)
       const json = await response.json()
       setData(json)
       setLogado(true)
    }

    const loginUser = async (email,senha) =>{
   
        const {options, url} = userLogin({
            email,
            senha
          })
        const tokenRes = await fetch(url,options);
        const { token } = await tokenRes.json()
        window.localStorage.setItem('token', token)
        getUser(token)
        if(tokenRes.ok){
            navigate('/perfil')
        }
    }

  return (
    <UserContext.Provider value={{logado,setLogado,data,setData,loading,setLoading,error,setError, loginUser}}>
        {children}
    </UserContext.Provider>
  )
}

