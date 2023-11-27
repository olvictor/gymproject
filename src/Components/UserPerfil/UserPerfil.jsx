import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import { BsFillGearFill } from "react-icons/bs";
import { imc } from "../../utlilitarios/imc";
import { infoGET, infoPOST } from "../../CustomHooks/UseFetch";
import { calcularTMB } from "../../utlilitarios/calcTMB";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { GiBodyHeight } from "react-icons/gi";
import { FaScaleBalanced } from "react-icons/fa6";
import { PiGenderIntersexDuotone } from "react-icons/pi";
import { GoGoal } from "react-icons/go";
import { HiOutlineAnnotation } from "react-icons/hi";
import { IoIosCalculator } from "react-icons/io";
import { MdDirectionsRun } from "react-icons/md";

import Input from "../input/Input";
import UseForm from "../../CustomHooks/UseForm";
import styles from "./UserPerfil.module.css";

const UserPerfil = () => {
  const [userInfo, setUserInfo] = useState(false);
  const [nome, setNome] = useState(null);
  const [peso, setPeso] = useState(null);
  const [idade, setIdade] = useState(null);
  const [sexo, setSexo] = useState(null);
  const [altura, setAltura] = useState(null);
  const [classificacao, setClassificacao] = useState(null);
  const [nivelDeAtividade, setNivelDeAtividade] = useState(null);
  const [imcValue, setImcValue] = useState(null);
  const [objetivo, setObjetivo] = useState(null);
  const [userObjetivo, setUserObjetivo] = useState(null);
  const [userAtividade, setUserAtividade] = useState(null);
  const [userSexo, setUserSexo] = useState(null);
  const { data } = useContext(UserContext);

  const userNome = UseForm();
  const userAltura = UseForm();
  const userPeso = UseForm();
  const userIdade = UseForm();

  useEffect(() => {
    const buscarInformacoes = async () => {
      const token = window.localStorage.getItem("token");

      const { url, options } = infoGET(token);

      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setNome(json.nome);
        setPeso(json.peso);
        setAltura(json.altura);
        setIdade(json.idade);
        setSexo(json.sexo);
        setImcValue(json.imc);
        setClassificacao(json.imc_classificacao);
        setNivelDeAtividade(json.nivel_de_atividade);
        setObjetivo(json.objetivo);
        setUserInfo(true);
      }
    };
    buscarInformacoes();
  }, []);

  const imcINFO = imc(userPeso.value, userAltura.value);
  const tmb = calcularTMB(peso, sexo, "moderado");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");

    const user = {
      nome: userNome.value,
      peso: userPeso.value,
      altura: userAltura.value,
      idade: userIdade.value,
      sexo: userSexo,
      nivel_de_atividade: userAtividade,
      imc: imcINFO.imc,
      imc_classificacao: imcINFO.resultado[0].classificacao,
      objetivo: userObjetivo,
    };

    const { url, options } = infoPOST(token, user);
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      setUserInfo(true);
    }
  };

  return (
    <div className={styles.containerPerfil}>
      <BsFillGearFill className={styles.svgEditar} />
      {!userInfo ? (
        <div>
          <form onSubmit={handleSubmit} className={styles.formINFO}>
            <Input type="text" label="Nome" {...userNome} />
            <Input type="text" label="Altura" {...userAltura} />
            <Input type="text" label="Peso" {...userPeso} />
            <Input type="text" label="Idade" {...userIdade} />
            <select
              defaultValue={0}
              onChange={({ target }) => setUserSexo(target.value)}
            >
              <option value="0">Selecione o seu sexo</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>

            <select
              defaultValue={0}
              onChange={({ target }) => setUserObjetivo(target.value)}
            >
              <option value="0">Selecione o seu objetivo</option>
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
          <div className={styles.boxUsuario}>
            <img src={data && data.user_photo} alt="" />
            <h3 className={styles.userNome}>{nome}</h3>
          </div>
          <div className={styles.boxUsuarioInformacoes}>
            <div className={styles.infoUser}>
              <LiaBirthdayCakeSolid />
              <h4>Idade :</h4>
              <p>{`${idade} anos`}</p>
            </div>
            <div className={styles.infoUser}>
              <GiBodyHeight />
              <h4>Altura :</h4>
              <p>{`${altura} m`}</p>
            </div>
            <div className={styles.infoUser}>
              <FaScaleBalanced />
              <h4>Peso :</h4>
              <p>{`${peso} KG`}</p>
            </div>
            <div className={styles.infoUser}>
              <PiGenderIntersexDuotone />
              <h4>Sexo :</h4>
              <p>{sexo}</p>
            </div>
            <div className={styles.infoUser}>
              <div className={styles.infoUser}>
                <IoIosCalculator />
                <h4>IMC :</h4>
                <p>{imcValue} </p>
              </div>
            </div>
            <div className={styles.infoUser}>
              <div className={styles.infoUser}>
                <HiOutlineAnnotation />
                <h4>Classificacao :</h4>
                <p>{classificacao}</p>
              </div>
            </div>
            <div className={styles.infoUser}>
              <MdDirectionsRun />
              <h4>Nivel de Atividade :</h4>
              <p>{nivelDeAtividade}</p>
            </div>
            <div className={styles.infoUser}>
              <GoGoal />
              <h4>Objetivo :</h4>
              <p>{`${objetivo} peso`}</p>
            </div>
          </div>
          <div className={styles.infoUserCalorias}>
            <h2>
              Quantidadade de calorias necessárias para o seu objetivo : kcal
            </h2>
            <div className={styles.infoCircle}>
              <svg>
                <circle
                  cx="150"
                  cy="100"
                  r="90"
                  fill="#1bfaad"
                  stroke="#fff"
                  stroke-width={3}
                ></circle>
                <circle cx="150" cy="100" r="75" fill="#1a2037"></circle>
              </svg>
              <div className={styles.infoCircleNumber}>
                <h3>{tmb} kcal</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPerfil;
