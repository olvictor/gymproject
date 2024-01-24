import React, { useContext, useState } from "react";
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
import { FaHourglassHalf } from "react-icons/fa";
import { IoIosCalculator } from "react-icons/io";
import { MdDirectionsRun } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import Loading from '../loading/Loading'

import Input from "../input/Input";
import UseForm from "../../CustomHooks/UseForm";
import styles from "./UserPerfil.module.css";
import axios from "axios";

const UserPerfil = () => {
  const [userInfo, setUserInfo] = useState(false);
  const [userObjetivo, setUserObjetivo] = useState(null);
  const [userAtividade, setUserAtividade] = useState(null);
  const [userSexo, setUserSexo] = useState(null);
  const { data } = useContext(UserContext);

  const userNome = UseForm();
  const userAltura = UseForm();
  const userPeso = UseForm();
  const userIdade = UseForm();

  const token = window.localStorage.getItem("token");

  const { url, options } = infoGET(token);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery(
    "getUserInfo",
    async () => {
      return await axios
        .get(url, axiosConfig)
        .then((response) => response.data);
    },
    {
      onSuccess: () => {
        setUserInfo(true);
      },
      refetchOnWindowFocus:false,
      retry:false
    }
  );
  const imcINFO = imc(userPeso?.value,userAltura?.value);
  
  const tmb = calcularTMB(response?.peso, response?.sexo, "moderado");
  console.log(tmb)
  const mutation = useMutation({
    mutationFn: async () => {
      const { url, options } = infoPOST(token);

      return await axios
        .post(
          url,
          {
            peso: userPeso.value,
            nome: userNome.value,
            altura: userAltura.value,
            idade: userIdade.value,
            sexo: userSexo,
            nivel_de_atividade: userAtividade,
            objetivo: userObjetivo,
            imc:  imcINFO.imc ,
            imc_classificacao: imcINFO.resultado[0].classificacao
          },
          axiosConfig
        )
        .then((response) => response.data);
    },
    onSuccess: ()=>{
      refetch()
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate();
  };
if(isLoading){
  return <Loading />
}
  return (
    <div className={styles.containerPerfil}>
      {/* <BsFillGearFill className={styles.svgEditar} /> */}
      {!userInfo ? (
        <div>
          <form onSubmit={handleSubmit} className={styles.formINFO}>
            <Input type="text" label="Nome"  {...userNome}  name={'nome'} icon={<MdDriveFileRenameOutline  />}/>
            <Input type="text" label="Altura" placeholder={"Ex: 1.73"}{...userAltura} name={'altura'} icon={<GiBodyHeight />}/>
            <Input type="number" label="Peso" {...userPeso} name={'peso'} icon={<FaScaleBalanced />}/>
            <Input type="number" label="Idade" {...userIdade} name={'idade'} icon={<FaHourglassHalf />}/>
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
            <h3 className={styles.userNome}>{response.nome}</h3>
          </div>
          <div className={styles.boxUsuarioInformacoes}>
            <div className={styles.infoUser}>
              <LiaBirthdayCakeSolid />
              <h4>Idade :</h4>
              <p>{`${response.idade} anos`}</p>
            </div>
            <div className={styles.infoUser}>
              <GiBodyHeight />
              <h4>Altura :</h4>
              <p>{`${response.altura} m`}</p>
            </div>
            <div className={styles.infoUser}>
              <FaScaleBalanced />
              <h4>Peso :</h4>
              <p>{`${response.peso} KG`}</p>
            </div>
            <div className={styles.infoUser}>
              <PiGenderIntersexDuotone />
              <h4>Sexo :</h4>
              <p>{response.sexo}</p>
            </div>
            <div className={styles.infoUser}>

                <IoIosCalculator />
                <h4>IMC :</h4>
                <p>{response.imc}</p>            
            </div>
            <div className={styles.infoUser}>
                <HiOutlineAnnotation />
                <h4>Classificacao :</h4>
                <p>{response.imc_classificacao}</p>
            </div>
            <div className={styles.infoUser}>
              <MdDirectionsRun />
              <h4>Nivel de Atividade :</h4>
              <p>{response.nivel_de_atividade}</p>
            </div>
            <div className={styles.infoUser}>
              <GoGoal />
              <h4>Objetivo :</h4>
              <p>{`${response.objetivo} peso`}</p>
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
                  strokeWidth={3}
                ></circle>
                <circle cx="150" cy="100" r="75" fill="#1a2037"></circle>
              </svg>
              <div className={styles.infoCircleNumber}>
                {<h3>{tmb.TMB} <span>KCAL</span></h3>}
              </div>
            </div>
            <div className={styles.infoMacroNutrientes}>
                  <h4>Proteina: <span>{tmb.gramasDeProteina}g</span></h4>
                  <h4>Carboidrato: <span>{tmb.gramasDeCarbo}g</span></h4>
                  <h4>Gordura: <span>{tmb.gramasDeGordura}g</span></h4>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPerfil;
