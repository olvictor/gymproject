import React, { createContext, useState } from "react";
import { getToken, userLogin } from "./CustomHooks/UseFetch";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [logado, setLogado] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const getUser = async (token) => {
    const { url, options } = getToken(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogado(true);
  };

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
      navigate("/user");
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
