import React, { useContext } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Dumbbell from "../../Assets/dumbbell.svg";
import { UserContext } from "../../UserContext";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { data, logado } = useContext(UserContext);

  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              className={styles.logoIMG}
              src={Dumbbell}
              alt="logo"
              height="30px"
            />
          </Link>
        </div>
        <div className={styles.links}>
          <Link to="/">Home</Link>
          {logado ? (
            <Link to="/user" className={styles.linkUser}>
              <FaUserCircle /> {data.username}{" "}
            </Link>
          ) : (
            <Link to="/login">Login/criar</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
