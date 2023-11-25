import React, { useState } from "react";
import styles from "./RegistroForm.module.css";
import Input from "./Input";
import UseForm from "../CustomHooks/UseForm";
import axios from "axios";
import { userRegister } from "../CustomHooks/UseFetch";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const RegistroForm = () => {
  const [error, setError] = useState(null);

  const usuario = UseForm();
  const email = UseForm("email");
  const senha = UseForm();

  const { url, options } = userRegister();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (user) => {
      return axios.post(url, user).then((response) => response.data);
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      return error.response;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usuario.value && email.value && senha.value) {
      mutation.mutate({
        username: usuario.value,
        email: email.value,
        senha: senha.value,
      });
    }
  };

  return (
    <div className={styles.registroForm}>
      <h1 className={styles.titulo}>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <Input label={"Email"} type={"email"} name={email} {...email} />
        <Input label={"Usuario"} type={"text"} name={usuario} {...usuario} />
        <Input label={"Senha"} type={"password"} name={senha} {...senha} />
        {mutation.isError && (
          <p className="error">{mutation.error.response.data.mensagem}</p>
        )}
        {mutation.isLoading ? (
          <button className={styles.buttonForm} disabled={true}>
            Cadastrando...
          </button>
        ) : (
          <button className={styles.buttonForm} disabled={false}>
            Registrar
          </button>
        )}
      </form>
    </div>
  );
};

export default RegistroForm;
