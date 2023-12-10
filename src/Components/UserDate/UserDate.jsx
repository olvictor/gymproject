import React, { useState } from 'react'
import Input from '../input/Input'
import { BsFillNodePlusFill } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";
import styles from './UserDate.module.css'
import { useMutation } from 'react-query';

const UserDate = () => {
    const [countInput,setCountInput] = useState([' '])

    const removeInput = (indice) =>{
      const novoArrayInputs = [...countInput]
      novoArrayInputs.splice(indice,1)
      setCountInput(novoArrayInputs)
    }


    const handleChange = (index,target) =>{
      const newInputFields  = [...countInput];
      newInputFields[index] = target.value;
      setCountInput(newInputFields)

    }

    const handleSubmit = async(e)=>{
      e.preventDefault()
      console.log(...countInput)

      const mutation = useMutation('')

    }
    return (
    <div style={{marginTop:'50px'}}>
        <form onSubmit={handleSubmit} className={styles.formUserDate}>
          <h2>Registre seu treino Diário :</h2>
     
          <div className={styles.formBoxInput}>
            {countInput.map((input, index)=>{
            return <div key={index}>
              <CiCircleRemove className={styles.inputRemove} onClick={()=>removeInput(index)}/>
              <input placeholder='Digite o músculo' type='text' onChange={({target})=> handleChange(index, target)}/>
            </div>
            })}
          </div>
          <BsFillNodePlusFill  onClick={()=>{
            setCountInput([...countInput,' '])
          }}/>
          <button type='submit'>Registrar</button>
        </form>
    </div>
  )
}

export default UserDate