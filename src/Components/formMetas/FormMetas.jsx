import React, { useState } from 'react'
import styles from './FormMetas.module.css'
import close from '../../Assets/close.svg'
import UseForm from '../../CustomHooks/UseForm'
import Input from "../input/Input";
import { useMutation } from 'react-query';
import axios from 'axios';
import { userMetas } from '../../CustomHooks/UseFetch';

const FormMetas = ({setOpenModalForm,refetch}) => {
  const titulo = UseForm()
  const descricao = UseForm()
  const [dataFinal,setDataFinal] = useState('')
  const token = window.localStorage.getItem('token')
  
  const {url,options} = userMetas(token);

  const mutation =  useMutation({
    mutationFn: async (dados)=>{
      return await axios.post(url,dados,options).then((response)=> response.data)
    },onSuccess: ()=>{
        setOpenModalForm(false)
        refetch()
    }
  })

  const handleSubmit = async(e)=>{
    e.preventDefault();
    mutation.mutate({
     titulo:titulo.value,
     descricao:descricao.value,
     data_fim:dataFinal
    })
  }


  return (
    <div className={styles.modalFormMetas}> 
    <img className={styles.closeModalFormMetas} src={close} alt="close" onClick={()=>setOpenModalForm(false)}/>
        <form onSubmit={handleSubmit}>
            <label>Titulo</label>
            <Input type='text'{...titulo}/>

            <label> Descrição </label>
            <Input type='text' {...descricao}/>
           
            <label>Data final da meta .</label>
            <input type="date" onChange={({target})=> setDataFinal(target.value)}/>

            <button>Enviar</button>
        </form> 
    </div>
  )
}

export default FormMetas