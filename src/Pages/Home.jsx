import React from "react";
import TyperAnimation from "../Components/TyperAnimation";
import alexander from "../Assets/alexander.jpg";
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
      </div>
      <div className={styles.homeImg}>
        <img src={alexander} alt="" />
      </div>
    </section>
  );
};

export default Home;
