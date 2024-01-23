import React, { useState } from "react";
import styles from "./UserTreino.module.css";
import UserTreinoHeader from "./UserTreinoHeader";
import Loading from "../loading/Loading";
import { AiFillPlusCircle } from "react-icons/ai";
import { useQuery } from "react-query";
import axios from "axios";
import ModalTreino from "../ModalTreino/ModalTreino";

const UserTreino = () => {
  const [exercises, setExercises] = useState(null);
  const [currentShow, setCurrentShow] = useState(null);
  const [exercisesShow, setExercisesShow] = useState(null);
  const [treino,setTreino] = useState([])
  const [openModalTreino,setOpenModalTreino] = useState(false)

  const options = {
    method: "GET",
    headers: {
      'X-RapidAPI-Key': '52b2bef0b1msh7a3c3d95569cc0bp16bb3bjsnb4948159ced3',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    },
  };

  const { data, isLoading } = useQuery(
    "buscarExercicios",
    async () => {
      return await axios
        .get("https://exercisedb.p.rapidapi.com/exercises", options)
        .then((response) => response.data);
    },
    {
      onSuccess: (data) => {
        setExercisesShow(data);
      },
      refetchOnWindowFocus: false,
    }
  );
  const mouseEnter = (i) => {
    setCurrentShow(i);
  };
  const mouseLeave = (i) => {
    setCurrentShow(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <UserTreinoHeader setExercisesShow={setExercisesShow}  treino={treino} setOpenModalTreino={setOpenModalTreino}/>
      <div className={styles.containerExercises}>
        {exercisesShow &&
          exercisesShow.map((i, index) => (
            <div
              key={index}
              className={styles.cardExercise}
              onMouseEnter={() => {
                mouseEnter(index);
              }}
              onMouseLeave={() => {
                mouseLeave(index);
              }}
            >
              <img src={i.gifUrl} />
              <div
                className={styles.cardExerciseInfo}
                style={{
                  display:  currentShow === index ? "block" : "",
                }}
              >
                <h3> Name: {i.name}</h3>
                <p> Muscle: {i.bodyPart}</p>
                <p>Equipament: {i.equipment}</p>
                <AiFillPlusCircle className={styles.cardExerciseInfoButton} onClick={() => {treino.push(i) ;setCurrentShow(null)}} />
              </div>
            </div>
          ))}
          {openModalTreino && <ModalTreino treino={treino} setOpenModalTreino={setOpenModalTreino} setTreino={setTreino} />}
      </div>
    </div>
  );
};

export default UserTreino;
