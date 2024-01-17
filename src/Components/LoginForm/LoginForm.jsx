import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";
import Input from "../input/Input";
import UseForm from "../../CustomHooks/UseForm";
import { RiUser3Line } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";

import { UserContext } from "../../UserContext";
import Loading from "../loading/Loading";

const LoginForm = () => {
  const username = UseForm();
  const senha = UseForm();
  const { loginUser, error, loading } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.validate() && senha.validate()) {
      loginUser(username.value, senha.value);
    }
  };

  if(loading){
    return <Loading />
  }

  return (
    <div className={styles.loginForm}>
      <h1 className={styles.titulo}>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label={"Usuário"}
          name={'username'}
          {...username}
          icon={<RiUser3Line />}
        />
        <Input
          type="password"
          label={"Senha"}
          name={'senha'}
          {...senha}
          icon={<RiLockPasswordLine />}
        />
        {error ? <p className="error">{error}</p> : ""}
        {!loading ? 
        <button className={styles.buttonForm}>
          ENTRAR
        </button>:
        <button disabled='true'  className={styles.buttonForm}>
            CARREGANDO...
        </button>}
      <div className={styles.link}>
        <span>Não possui uma conta ?</span>
        <Link className={styles.linkRegistrar} to="/login/registrar">
          Registrar
        </Link>
      </div>
      </form>
    </div>
  );
};

export default LoginForm;
