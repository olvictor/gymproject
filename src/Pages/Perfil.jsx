import React from "react";
import { Routes, Route } from "react-router-dom";
import UserPerfil from "../Components/UserPerfil/UserPerfil";
import UserTreino from "../Components/UserTreino/UserTreino";
import UserDate from "../Components/UserDate/UserDate";
import UserMenu from "../Components/UserMenu/UserMenu";
import UserPost from "../Components/UserPost/UserPost";
import UserFeed from "../Components/UserFeed/UserFeed";

const Perfil = () => {
  return (
    <div className="container">
      <UserMenu />
      <Routes>
        <Route path="/" element={<UserPerfil />}></Route>
        <Route path="treino" element={<UserTreino />}></Route>
        <Route path="date" element={<UserDate />}></Route>
        <Route path="post" element={<UserPost />}></Route>
        <Route path="feed" element={<UserFeed />}></Route>
      </Routes>
    </div>
  );
};

export default Perfil;
