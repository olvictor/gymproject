import React, { useState } from "react";
import styles from "./RegistroForm.module.css";
import Input from "../input/Input";
import UseForm from "../../CustomHooks/UseForm";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiUser3Line } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { userRegister } from "../../CustomHooks/UseFetch";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const RegistroForm = () => {
  const [error, setError] = useState(null);
  const [senhaConfirmada, setSenhaConfirmada] = useState(false);
  const usuario = UseForm();
  const email = UseForm("email");
  const senha = UseForm();
  const confirmarSenha = UseForm();

  const { url } = userRegister();

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
    if (confirmarSenha.value === senha.value) {
      setSenhaConfirmada(true);
      setError(null);
    } else {
      setError("As senhas precisam ser iguais");
    }

    if (usuario.value && email.value && senha.value && senhaConfirmada) {
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
        <IoExitOutline  className={styles.irParaLogin} onClick={()=> navigate("/login")}/>
        <Input label={"Email"} type={"email"} name={email} {...email} icon={<MdOutlineMailOutline />} />
        <Input label={"Usuário"} type={"text"} name={usuario} {...usuario} icon={<RiUser3Line />} />
        <Input label={"Senha"} type={"password"} name={senha} {...senha} icon={<RiLockPasswordLine />} />
        <Input label={"Confirmar senha"} type={"password"} name={senha} {...confirmarSenha} icon={<RiLockPasswordLine />}
        />

        {mutation.isError && (
          <p className="error">{mutation.error.response.data.mensagem}</p>
        )}
        {error && <p className="error">{error}</p>}
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
