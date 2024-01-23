import React, { useState } from 'react'
import styles from './MeusExercicios.module.css'
import { IoIosCloseCircleOutline } from "react-icons/io";

const MeusExercicios = ({treino,setTreino}) => {
  const filtroDosMusculos = treino.map((item) => item.target)
  const musculosExistentesNalista = []
  const [exerciseShow,setExerciseShow] = useState();
  const [itemAtivo, setItemAtivo] = useState(null);

  const musculos = new Map()

  for (let i =0; i < filtroDosMusculos.length; i++){
      if(!musculos.has(filtroDosMusculos[i])){
          musculos.set(filtroDosMusculos[i],1)
      }
      else {
          musculos.set(filtroDosMusculos[i],musculos.get(filtroDosMusculos[i])+ 1)
      }
  }

  for(const [key,value]of musculos){
      musculosExistentesNalista.push(key)
  }
 
  const handleClick = (muscle,index) =>{
    const filtrarExerciciosPorMusculo = treino.filter((item)=> item.target === muscle)
    setItemAtivo(index)
    setExerciseShow(filtrarExerciciosPorMusculo)
  }

  const removeTreino = (id) =>{
      const novoArrayDeTreinos = treino.filter((i)=> i.id !== id)
      setTreino(novoArrayDeTreinos)
      setExerciseShow(novoArrayDeTreinos)
  }
  return (
    <div>
      <div>
        <ul style={{display:'flex',marginTop:'50px',gap:'10px'}}>
          {musculosExistentesNalista.map((item,index)=>{
            return <li style={{textTransform:'capitalize', cursor:'pointer', filter: itemAtivo === index ? 'drop-shadow(0px 0px 5px #1bfaad)' : ''}} onClick={()=>handleClick(item,index)}>{item}</li>
          })}
        </ul>
      </div>  
      <div className={styles.MeusExercicios}>
        {!exerciseShow && treino.map((item,index)=>{
          return <div key={index} className={styles.boxMeusExercicios}> 
            <img src={item.gifUrl}></img>
            <p>Nome: <span>{item.name}</span></p>
            <p>Musculo Alvo: <span>{item.target}</span></p>
            <IoIosCloseCircleOutline className={styles.iconClose} onClick={()=> removeTreino(item.id)}/>
          </div>
        })}
        {exerciseShow && exerciseShow.map((item,index)=>{
          return <div key={index} className={styles.boxMeusExercicios}> 
            <img src={item.gifUrl}></img>
            <p>Nome: <span>{item.name}</span></p>
            <p>Musculo Alvo: <span>{item.target}</span></p>
            <IoIosCloseCircleOutline className={styles.iconClose} onClick={()=> removeTreino(item.id)}/>
          </div>
        })}
      </div>
    </div>
  )
}

export default MeusExercicios