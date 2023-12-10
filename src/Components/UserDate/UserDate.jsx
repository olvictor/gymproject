import React, { useState } from 'react'
import Input from '../input/Input'
import { BsFillNodePlusFill } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";
import styles from './UserDate.module.css'
import { useMutation } from 'react-query';
import axios from 'axios';

const UserDate = () => {
    const [countInput,setCountInput] = useState([' '])

    const token = window.localStorage.getItem('token')

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const handleSubmit = (e) =>{
      e.preventDefault()
      const mutation = useMutation({
        mutationFn: async () => {
          return await axios
            .post(
              `http://localhost:3000/user/treinos`,
              {
                musculo: 'teste'
              },
              axiosConfig
            )
            .then((response) => response.data);
        },
        onSuccess: () => {
          refetch();
        },
      });
    }

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