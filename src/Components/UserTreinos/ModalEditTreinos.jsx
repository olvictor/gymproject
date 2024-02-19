import React, { useState } from 'react'
import styles from './UserTreinos.module.css'
import { IoMdClose } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { editTreinoDiario } from '../../CustomHooks/UseFetch';

const ModalEditTreinos = ({setOpenModalEdit, itemEdit,treinos,setTreinos}) => {
    const [countInput,setCountInput] = useState([' '])
    const [dataEdit,setDataEdit] = useState(null);
    const token = window.localStorage.getItem('token')
    
    const {data: dataTipoDeTreino} = useQuery('buscarTipoDeTreino',async () =>{
        const {url,options} = buscarTipoDeTreino(token);
          return await axios.get(url,options).then((response)=> response.data)
    })
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

    const mutation = useMutation({
        mutationFn: async (treino) => {
          const {url,options} = editTreinoDiario(token,itemEdit.id)

          return await axios
            .put(url,
              {
                musculos: treino,
                data: dataEdit
              },
              options
            )
            .then((response) => response.data);
        },onSuccess :()=>{
          setCountInput([" "])
        }
      });
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        mutation.mutate(countInput)
      
        let itemEditado = {
            ...itemEdit,
            musculos: [...countInput].toString(','),
            data_publicacao : dataEdit,
        }
        let novoArray = [...treinos];
        const indice = novoArray.indexOf(itemEdit)
        novoArray.splice(indice, 1, itemEditado)  
        setTreinos(novoArray)
        setOpenModalEdit(false)
    }

return (
    <div className={styles.modalEdit}>
        <IoMdClose style={{position:'absolute',right:0,fontSize:'2rem',top:0}} onClick={()=> setOpenModalEdit(false)}/>
        <form onSubmit={handleSubmit}>
            {countInput.map((input, index)=>{
                    return <div key={index}>
                        <CiCircleRemove style={{fontSize:'2rem'}} onClick={()=>removeInput(index)}/>
                        <select defaultValue={0} onChange={(e)=> handleChange(index, e.target)}>
                        <option value="0">Selecionar...</option>
                        {dataTipoDeTreino && dataTipoDeTreino.map((treino)=>{
                        return  <option style={{textTransform:'capitalize'}} value={treino.tipo}>{treino.tipo}</option>
                        })}
                        </select>
                    </div>
                    
            })}
            <span style={{fontSize:'1rem',cursor:'pointer',color:'#1bfaad'}} onClick={()=>{
                    setCountInput([...countInput,' '])
                }}>Mais opções .
            </span>
            <input type="date" onChange={(e)=> setDataEdit(e.target.value)}/>
            <button className={styles.buttonModalEdit}>EDITAR</button>
        </form>
    </div>
  )
}

export default ModalEditTreinos