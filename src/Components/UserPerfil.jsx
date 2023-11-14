import React, { useContext, useEffect, useState } from "react";
import { BsFillGearFill } from "react-icons/bs";
import styles from "./UserPerfil.module.css";
import { imc } from "../utlilitarios/imc";
import { infoGET, infoPOST } from "../CustomHooks/UseFetch";
import { UserContext } from "../UserContext";
import { calcularTMB } from "../utlilitarios/calcTMB";
import Input from "./Input";
import UseForm from "../CustomHooks/UseForm";
const UserPerfil = () => {
  const { data } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState(true);
  const [nome, setNome] = useState(null);
  const [peso, setPeso] = useState(null);
  const [idade, setIdade] = useState(null);
  const [sexo, setSexo] = useState(null);
  const [altura, setAltura] = useState(null);
  const [nivelDeAtividade, setNivelDeAtividade] = useState(null);
  const [objetivo, setObjetivo] = useState(null);
  const [userObjetivo, setUserObjetivo] = useState(null);
  const [userAtividade, setUserAtividade] = useState(null);

  const userAltura = UseForm();
  const userPeso = UseForm();
  const userIdade = UseForm();
  const userSexo = UseForm();

  useEffect(() => {
    const buscarInformacoes = async () => {
      const token = window.localStorage.getItem("token");

      const { url, options } = infoGET(token);

      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json);
      setPeso(json.peso);
      setAltura(json.altura);
      setIdade(json.idade);
      setSexo(json.sexo);
      setNivelDeAtividade(json.nivel_de_atividade);
      setObjetivo(json.objetivo);
      setUserInfo(true);
    };
    buscarInformacoes();
  }, []);

  const imcINFO = imc(peso, altura);
  const tmb = calcularTMB(peso, sexo, "moderado");
  console.log(imcINFO);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");

    const user = {
      peso: userPeso.value,
      altura: userAltura.value,
      idade: userIdade.value,
      sexo: userSexo.value,
      nivel_de_atividade: userAtividade,
      objetivo: userObjetivo,
    };

    const { url, options } = infoPOST(token, user);
    const response = await fetch(url, options);
    const json = await response.json();
  };

  return (
    <div className={styles.containerPerfil}>
      <h1 className={styles.tituloUser}>Perfil do usuário</h1>
      {!userInfo ? (
        <div>
          <form onSubmit={handleSubmit} className={styles.formINFO}>
            <Input type="text" label="Altura" {...userAltura} />
            <Input type="text" label="Peso" {...userPeso} />
            <Input type="text" label="Idade" {...userIdade} />
            <Input type="text" label="Sexo" {...userSexo} />
            <select
              defaultValue={0}
              onChange={({ target }) => setUserObjetivo(target.value)}
            >
              <option value="0">Selecione o objetivo</option>
              <option value="manter">Manter Peso</option>
              <option value="ganhar">Ganhar Peso</option>
              <option value="perder">Emagrecer</option>
            </select>
            <select
              defaultValue={0}
              onChange={({ target }) => setUserAtividade(target.value)}
            >
              <option value="0">Nivel de atividade</option>
              <option value="leve">Leve</option>
              <option value="moderado">Moderado</option>
              <option value="pesado">Pesado</option>
            </select>

            <button className={styles.buttonForm}>Enviar</button>
          </form>
        </div>
      ) : (
        <div className={styles.containerUserInfo}>
          <div className={styles.infoUser}>
            <label>Nome:</label>
            <input type="text" placeholder={data && data.username} disabled />
          </div>
          <div className={styles.infoUser}>
            <label>idade:</label>
            <input type="text" placeholder={`${idade} anos`} disabled />
          </div>
          <div className={styles.infoUser}>
            <label>Altura:</label>
            <input type="text" placeholder={`${altura} metros`} disabled />
          </div>
          <div className={styles.infoUser}>
            <label>Peso:</label>
            <input type="text" placeholder={`${peso} kg`} disabled />
          </div>
          <div className={styles.infoUser}>
            <label>Sexo:</label>
            <input type="text" placeholder={sexo} disabled />
          </div>
          <div className={styles.infoUser}>
            <label>Imc:</label>
            <input type="text" placeholder={imcINFO.imc} disabled />
          </div>
          <div className={styles.infoUser}>
            <label>Classificação:</label>
            <input type="text" placeholder={imcINFO.classificacao} disabled />
          </div>
          <div className={styles.infoUser}>
            <label>Nivel de Atividade:</label>
            <input type="text" placeholder={nivelDeAtividade} disabled />
          </div>
          <div className={styles.infoUser}>
            <label>Objetivo:</label>
            <input type="text" placeholder={`${objetivo} peso`} disabled />
          </div>
          <BsFillGearFill />
        </div>
      )}
    </div>
  );
};

export default UserPerfil;
