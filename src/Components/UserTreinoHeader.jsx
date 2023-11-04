import React, { useEffect, useState } from 'react'
import styles from './UserTreino.module.css'

const UserTreinoHeader = ({setMusculoAlvo}) => {
const [bodyparts, setBodyParts] = useState([])

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f1c6fe8ad9msh54f8722877ef276p13b3bfjsn2b3b8d943027',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };
    useEffect(()=>{

        const getBodyParts = async () =>{
            const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList',options)
            const json = await response.json()
            setBodyParts([...json])
            console.log(bodyparts)
        }
        getBodyParts()

    },[])

    const handleChange =({target}) =>{
            setMusculoAlvo(target.value)
    }

  return (
    <header className={styles.headerUsertreino}>
        <span>Selecione o grupamento muscular : </span>
        <select defaultValue={0} onChange={handleChange}>
            <option value={0}>Selecione o músculo</option>
            {bodyparts && bodyparts.map((i)=>(
                <option key={i} value={i}>{i}</option>
            ))}
        </select>

        <button>Pesquisar</button>
    </header>
  )
}

export default UserTreinoHeader