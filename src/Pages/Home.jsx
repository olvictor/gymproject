import React from "react";
import girlHome from "../Assets/girlHome.png";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className={`${styles.homeSection} home`}>
      <div className={styles.homeText}>
        <h1>Se for para sofrer que seja na academia. Lá a dor traz <span>resultados.</span></h1>
        <button className={styles.butttonHome} onClick={()=> navigate("/user")}>Comece-já</button>
      </div>
      <div className={styles.homeImg}>
        <img src={girlHome} alt="" />
      </div>
    </section>
  );
};

export default Home;
