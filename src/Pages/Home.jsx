import React from "react";
import TyperAnimation from "../Components/TyperAnimation/TyperAnimation";
import girlHome from "../Assets/girlHome.png";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <section className={`${styles.homeSection} home`}>
      <div className={styles.homeText}>
        <TyperAnimation
          texto={
            "Se for para sofrer que seja na academia. Lá a dor traz resultados."
          }
        />
        <button>Comece-já</button>
      </div>
      <div className={styles.homeImg}>
        <img src={girlHome} alt="" />
      </div>
    </section>
  );
};

export default Home;
