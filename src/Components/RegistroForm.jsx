import React, { useState } from "react";
import styles from "./RegistroForm.module.css";
import Input from "./Input";
import UseForm from "../CustomHooks/UseForm";
import { userRegister } from "../CustomHooks/UseFetch";
import { useNavigate } from "react-router-dom";

const RegistroForm = () => {
  const [error, setError] = useState(null);

  const usuario = UseForm();
  const email = UseForm();
  const senha = UseForm();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email.value,
      username: usuario.value,
      senha: senha.value,
    };

    const { url, options } = userRegister(user);
    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok) {
      return setError(json.mensagem);
    }
    navigate("/login");
  };

  return (
    <div className={styles.registroForm}>
      <h1 className={styles.titulo}>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <Input label={"Email"} type={"email"} name={email} {...email} />
        <Input label={"Usuario"} type={"text"} name={usuario} {...usuario} />
        <Input label={"Senha"} type={"password"} name={senha} {...senha} />
        {error && <p className="error">{error}</p>}
        <button className={styles.buttonForm}>Registrar</button>
      </form>
    </div>
  );
};

export default RegistroForm;
