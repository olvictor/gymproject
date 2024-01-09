import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserPerfil from "../Components/UserPerfil/UserPerfil";
import UserTreino from "../Components/UserTreino/UserTreino";
import UserDate from "../Components/UserDate/UserDate";
import UserMenu from "../Components/UserMenu/UserMenu";
import UserPost from "../Components/UserPost/UserPost";
import UserFeed from "../Components/UserFeed/UserFeed";
import { UserContext } from "../UserContext";
import UserMetas from "../Components/UserMetas/UserMetas";

const Perfil = () => {
const {logado} = useContext(UserContext)
const navigate = useNavigate()

useEffect(()=>{
  if(!logado){
    navigate('/login')
  }
},[logado])


  return (
    <div className="container">
      <UserMenu />
      <Routes>
        <Route path="/" element={<UserPerfil />}></Route>
        <Route path="treino/*" element={<UserTreino />}></Route>
        <Route path="date" element={<UserDate />}></Route>
        <Route path="post" element={<UserPost />}></Route>
        <Route path="feed" element={<UserFeed />}></Route>
        <Route path="metas" element={<UserMetas />}></Route>
      </Routes>
    </div>
  );
};

export default Perfil;
