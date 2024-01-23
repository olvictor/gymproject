import React, { useState } from 'react'
import { CiCircleRemove } from "react-icons/ci";
import { useMutation, useQuery } from 'react-query';
import styles from './UserDate.module.css'
import axios from 'axios';
import UserTreinos from '../UserTreinos/UserTreinos';

const UserDate = () => {
    const [countInput,setCountInput] = useState([' '])

    const token = window.localStorage.getItem('token')

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const mutation = useMutation({
      mutationFn: async (treino) => {
        return await axios
          .post(
            `http://localhost:3000/user/treinos`,{
              musculos: treino
            },
            axiosConfig
          )
          .then((response) => response.data);
      },onSuccess :()=>{
        refetch()
        setCountInput([" "])
      }
    });

    const {data ,refetch} = useQuery('buscarTreinos', async () =>{
      return await axios.get('http://localhost:3000/user/treinos',axiosConfig).then((response) => response.data)
    },{
      refetchOnWindowFocus:false,

    }
  
    )

    const handleSubmit = (e) =>{
      e.preventDefault()
      mutation.mutate(countInput)
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
      <div > 
        <div style={{marginTop:'50px'}}>
            <form onSubmit={handleSubmit} className={styles.formUserDate}>
              <h2>Oque você treinou hoje ?</h2>
        
              <div className={styles.formBoxInput}>
                <div>
                  {countInput.map((input, index)=>{
                  return <div key={index}>
                    <CiCircleRemove className={styles.inputRemove} onClick={()=>removeInput(index)}/>
                    <input placeholder='Digite o músculo' type='text' onChange={({target})=> handleChange(index, target)}/>
                  </div>
                  })}
                  </div>
              <span style={{fontSize:'1rem',cursor:'pointer',color:'#1bfaad'}} onClick={()=>{
                setCountInput([...countInput,' '])
              }}>Mais opções .</span>
              </div>
              <button type='submit'>Registrar</button>
            </form>
      </div>
      {data && <UserTreinos treinos={data} />}
    </div>
  )
}

export default UserDate