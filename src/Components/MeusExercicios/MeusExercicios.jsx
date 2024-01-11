import React, { useState } from 'react'
import styles from './MeusExercicios.module.css'

const MeusExercicios = ({treino}) => {
  const filtroDosMusculos = treino.map((item) => item.target)
  const [musculosExistentesNalista,setMusculosExistentesNaLista] = useState([]);
  const musculos = new Map()

  for (let i =0; i < filtroDosMusculos.length; i++){
      if(!musculos.has(filtroDosMusculos[i])){
          musculos.set(filtroDosMusculos[i],1)
      }
      else {
          musculos.set(filtroDosMusculos[i],musculos.get(filtroDosMusculos[i])+ 1)
      }
  }
  console.log(musculos)
   for(const [key,value]of musculos){
    if(!musculosExistentesNalista.includes(key)){
      musculosExistentesNalista.push(key)
    }
   }
  return (
    <div>
      <div>
        <ul>
          {musculosExistentesNalista.map((item)=>{
            return <li>{item}</li>
          })}
        </ul>
      </div>  
      <div className={styles.MeusExercicios}>
        {treino.map((item,index)=>{
          return <div key={index} className={styles.boxMeusExercicios}> 
            <img src={item.gifUrl}></img>
            <p>Nome: <span>{item.name}</span></p>
            <p>Musculo Alvo: <span>{item.target}</span></p>
          </div>
        })}
      </div>
    </div>
  )
}

export default MeusExercicios