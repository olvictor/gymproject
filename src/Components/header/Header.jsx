import React, { useContext, useState } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import Dumbbell from "../../Assets/dumbbell.svg";
import { UserContext } from "../../UserContext";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { data, logado,setData,setLogado } = useContext(UserContext);
  const [openMenu, setOpenMenu] = useState(false)
  const navigate = useNavigate()


  const logout = async ()=>{
    setData(null);
    setLogado(false);
    localStorage.removeItem('token');
    navigate('/')
  }


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
          {logado ?   
          <div className={styles.boxUser} onClick={()=>setOpenMenu(!openMenu  )}> 
            <Link to="/user" className={styles.linkUser}>
              <FaUserCircle /> {data.username}{" "}
            </Link>
            <ul style={{display: openMenu ? 'flex' :'none'}}  onMouseLeave={()=> setOpenMenu(false)}>
               <Link to="/user">Perfil</Link>
               <Link onClick={()=> logout()}>Sair</Link>
            </ul>
          </div>
           : 
            <Link to="/login" className={styles.headerLogin}>Login/criar</Link>
          }
        </div>
      </nav>
    </header>
  );
};

export default Header;
