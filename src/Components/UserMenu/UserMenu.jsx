import React from "react";
import { NavLink } from "react-router-dom";
import User from "../../Assets/user.svg";
import Treino from "../../Assets/treino.svg";
import Date from "../../Assets/date.svg";
import Photo from "../../Assets/photo.svg";
import Feed from "../../Assets/feed.svg";
import Clock from "../../Assets/clock.svg";

import styles from "./UserMenu.module.css";

const UserMenu = () => {
  return (
    <ul className={styles.headerProfile}>
      <NavLink to="/user" end>
        <img src={User} />
      </NavLink>
      <NavLink to="/user/treino">
        <img src={Treino} />
      </NavLink>
      <NavLink to="/user/date">
        <img src={Date} />
      </NavLink>
      <NavLink to="/user/post">
        <img src={Photo} />
      </NavLink>
      <NavLink to="/user/feed">
        <img src={Feed} />
      </NavLink>
      <NavLink to="/user/metas">
        <img src={Clock} />
      </NavLink>
    </ul>
  );
};

export default UserMenu;
