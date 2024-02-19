import React, { createContext, useEffect, useState } from "react";
import { getToken, userLogin } from "./CustomHooks/UseFetch";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Components/loading/Loading";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [logado, setLogado] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  
  const location = useLocation();

  const getUser = async (token) => {
    const { url, options } = getToken(token);
    const response = await fetch(url, options);
    const json = await response.json();
    if(!response.ok){
      navigate("/");
      setLogado(false)
    }else{
      setData(json);
      setLogado(true);
      if(location.pathname === '/login'){
        navigate('/user')
      }else{
        navigate(location.pathname)
      }
    }
  };

  useEffect(()=>{
      if(token){
        getUser(token)
      }
  },[])
  
  const loginUser = async (username, senha) => {
    const { options, url } = userLogin({
      username,
      senha,
    });
    setLoading(true);
    const tokenRes = await fetch(url, options);
    const json = await tokenRes.json();
    if (!tokenRes.ok) {
      setLoading(false);
      setError(json.mensagem);
    }
    if (tokenRes.ok) {
      setLoading(false);
      setError(null);
      window.localStorage.setItem("token", json.token);
      getUser(json.token);
    }
  };

  return (
    <UserContext.Provider
      value={{
        logado,
        setLogado,
        data,
        setData,
        loading,
        setLoading,
        error,
        setError,
        loginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
