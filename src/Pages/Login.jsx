import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../Components/LoginForm";
import RegistroForm from "../Components/RegistroForm";
import Spencer from "../Assets/spencer.jpg";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={`${styles.loginPage} container`}>
      <div className={styles.loginBoxImg}>
        <img src={Spencer} />
      </div>
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="registrar" element={<RegistroForm />}></Route>
      </Routes>
    </div>
  );
};

export default Login;
