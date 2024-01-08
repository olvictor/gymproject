import React, { useEffect, useState } from "react";
import styles from "./UserTreino.module.css";
import { useQuery } from "react-query";
import axios from "axios";


const UserTreinoHeader = ({ setExercisesShow, treino, setOpenModalTreino }) => {
  const [bodyparts, setBodyParts] = useState([]);
  const [musculoAlvo, setMusculoAlvo] = useState(null);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f1c6fe8ad9msh54f8722877ef276p13b3bfjsn2b3b8d943027",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  const { data, isLoading } = useQuery(
    "buscarItemsMenu",
    async () => {
      return await axios
        .get(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          options
        )
        .then((response) => response.data);
    },
    {
      onSuccess: (data) => {
        setBodyParts(data);
      },
      refetchOnWindowFocus: false,
    }
  );

  const handleChange = ({ target }) => {
    setMusculoAlvo(target.value);
  };

  const handleClick = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f1c6fe8ad9msh54f8722877ef276p13b3bfjsn2b3b8d943027",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    const { data: response, isLoading } = useQuery(
      "buscarExerciciosPorGrupamento",
      async () => {
        return await axios
          .get(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${musculoAlvo}`,
            options
          )
          .then((response) => response.data);
      },
      {
        onSuccess: (data) => {
          setExercisesShow(data);
        },
        refetchOnWindowFocus: false,
      }
    );
  };
  return (
    <header className={styles.headerUsertreino}>
      <div style={{width:'80%',display:'flex',alignItems:'center',gap:'15px',textAlign:'center'}}>
        <span>Selecione o grupamento muscular : </span>
        <select defaultValue={0} onChange={handleChange}>
          <option value={0}>Selecione o músculo</option>
          {bodyparts &&
            bodyparts.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
        </select>
        <button onClick={handleClick}>Pesquisar</button>
      </div>
      <div className={styles.headerUsertreinoBoxMeuTreino} style={{cursor:'pointer'}} onClick={()=>setOpenModalTreino(true)}>
        <h3>Meu treino</h3>
        <div style={{width:'20px',height:'20px',borderRadius:'50%',display:'flex',justifyContent:'center',alignItems:'center', backgroundColor:'#1bfaad', color:'#1a2037'}}>{treino.length }</div>
      </div>
    </header>
  );
};

export default UserTreinoHeader;
