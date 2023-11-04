import React, { useEffect, useState } from 'react'
import styles from './UserTreino.module.css'
import {AiFillPlusCircle} from 'react-icons/ai'
import UserTreinoHeader from './UserTreinoHeader'

const UserTreino = () => {
  const [exercises, setExercises] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const [currentShow, setCurrentShow] = useState(null)
  const [musculoAlvo, setMusculoAlvo] = useState(null)

  useEffect(()=>{

    const options = {
      method: 'GET',
      params: {
        limit: '30'
      }
      ,
      headers: {
        'X-RapidAPI-Key' : 'f1c6fe8ad9msh54f8722877ef276p13b3bfjsn2b3b8d943027',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    };


    const getExercises = async () =>{
    
        const response  =  await fetch('https://exercisedb.p.rapidapi.com/exercises',options)
        const json = await response.json()
        setExercises(json)
    }

    getExercises()


  },[])

  const mouseEnter = (i) =>{
    setCurrentShow(i)
    setIsHovered(true)
  }
  const mouseLeave = (i) =>{
    setIsHovered(false)
    setCurrentShow(null)
  }
  console.log(musculoAlvo)

  return (
    <div>
        <UserTreinoHeader setMusculoAlvo={setMusculoAlvo}/>
      <div className={styles.containerExercises}>
        {exercises && exercises.map((i,index)=>(
          <div key={index} className={`${styles.cardExercise} ${isHovered ? 'hovered' : ''}`} onMouseEnter={()=>{mouseEnter(index)}} onMouseLeave={()=>{mouseLeave(index)}}>
          <img src={i.gifUrl}/>
          <div className={styles.cardExerciseInfo} style={{display: isHovered  && currentShow === index? 'block' : ''}}>
              <h3> Name: {i.name}</h3>
              <p> Muscle: {i.bodyPart}</p>
              <p>Equipament: {i.equipment}</p>
              <AiFillPlusCircle onClick={()=> console.log('teste')} />
          </div>
        </div>
        ))}
      </div>
    </div>

  )
}

export default UserTreino