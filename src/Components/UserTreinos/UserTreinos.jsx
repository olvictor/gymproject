import React from 'react'
import styles from './UserTreinos.module.css'

const UserTreinos = ({treinos}) => {
   const DiasDaSemana = ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"];
   const MesesDoAno = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
   const diasDoMesDez =[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "] 

  return (
    <div className={styles.containerCalendario}>
        {treinos.map((treino,indice)=>{
        const dataDoTreino = new Date(treino.data_publicacao);
        const DiaNumerico = dataDoTreino.getDate();
        const MesNumerico = dataDoTreino.getMonth() + 1;
        const MesDoAno = MesesDoAno[MesNumerico-1];
        diasDoMesDez.splice(DiaNumerico,1,treino);

        const diaDaSemana = DiasDaSemana[dataDoTreino.getDay()]
        const arrayMusculos = treino.musculos.split(",")

        return <div className={styles.cardTreino}>
                <div className={styles.cardHeader}>
                </div>
                <div className={styles.cardTreinoData}>
                    {<h3>{DiaNumerico}</h3>}
                    {<h4>{diaDaSemana}</h4>}
                    /
                    {<h4>{MesDoAno}</h4>}
                </div>
                <div className={styles.cardTreinoMusculos}> 
                  {arrayMusculos.map((item,index)=>{
                    return <h3 style={{textTransform:'capitalize'}} key={index}>{item}</h3>
                  })}
                </div>
            </div>
        })}
    </div>
  )
}

export default UserTreinos