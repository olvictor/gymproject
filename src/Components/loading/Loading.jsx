import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.boxLoading}>
      <span className={styles.carregando}></span>
    </div>
  );
};

export default Loading;
