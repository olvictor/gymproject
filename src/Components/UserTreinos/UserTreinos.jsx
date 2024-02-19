import React, { useRef, useState } from 'react'
import styles from './UserTreinos.module.css'
import { MdEditSquare } from "react-icons/md";
import ModalEditTreinos from './ModalEditTreinos';

const UserTreinos = ({treinos ,setTreinos}) => {
   const DiasDaSemana = ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"];
   const MesesDoAno = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
   const diasDoMesDez =[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "] 
   const [itemAtual,setItemAtual] = useState(null)
   const [openModalEdit,setOpenModalEdit] = useState(false)
   const [itemEdit,setItemEdit] = useState(null)
  
   const handleEdit = (treino) =>{
      setItemEdit(treino)
      setOpenModalEdit(true)
    }
    
   return (
    <div className={styles.containerCalendario}>
        {openModalEdit &&  <ModalEditTreinos  setOpenModalEdit={setOpenModalEdit} treinos={treinos} itemEdit={itemEdit} setTreinos={setTreinos}/>}
        {treinos.map((treino,indice)=>{
        const dataDoTreino = new Date(treino.data_publicacao);
        const DiaNumerico = dataDoTreino.getDate();
        const MesNumerico = dataDoTreino.getMonth() + 1;
        const MesDoAno = MesesDoAno[MesNumerico-1];
        diasDoMesDez.splice(DiaNumerico,1,treino);

        const diaDaSemana = DiasDaSemana[dataDoTreino.getDay()]
        const arrayMusculos = treino.musculos.split(",")

        return <div className={styles.cardTreino} onMouseEnter={()=> setItemAtual(treino.id)} onMouseLeave={()=>setItemAtual(null)}>
                <div className={styles.cardHeader}>
                  {itemAtual === treino.id &&  <MdEditSquare className={styles.editTreino} onClick={()=>handleEdit(treino)} />}
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