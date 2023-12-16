import React, { useEffect, useState } from 'react'
import calcTempo  from '../../utlilitarios/calcTempo'
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../loading/Loading';
import styles from './UserMetas.module.css';
import Input from '../../Components/input/Input'
import UseForm  from '../../CustomHooks/UseForm'
const UserMetas = () => {
  const token = window.localStorage.getItem("token");
  const [dataFinalMeta, setDataFinalMeta] = useState('')
  const [dataInput,setDataInput] = useState('')
  const [monstrarItemBoolean,setMostrarItemBoolean] = useState(false)
  const [monstrarItem, setMonstrarItem] = useState(null)    
  const [dias,horas,minutos,segundos] =  calcTempo(new Date(), new Date(dataFinalMeta));

  const titulo = UseForm()
  const descricao = UseForm()
  console.log(titulo.value,descricao.value,dataInput)
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const {data ,isLoading} = useQuery('buscarMetas', async()=>{
   return  await axios.get('http://localhost:3000/user/metas', axiosConfig).then((response)=> response.data)},{
    refetchOnWindowFocus:false,
    retry:false
  })
  
  if(isLoading){
    return <Loading />
  }
  const handleClick = (item) =>{
      setMostrarItemBoolean(!monstrarItemBoolean)
      setMonstrarItem(item)
      setDataFinalMeta(item.data_fim)
      console.log(item)
  }

  const mutation =  useMutation({
    mutationFn: async (dados)=>{
      return await axios.post('http://localhost:3000/user/metas',dados,axiosConfig).then((response)=> response.data)
    }
  })


  const handleSubmit = async(e)=>{
    e.preventDefault();
    mutation.mutate({
     titulo:titulo.value,
     descricao:descricao.value,
     data_fim:dataInput
    })
  }




  return (
    <div>
        <form onSubmit={handleSubmit}>
          <Input placeholder={'Titulo'} {...titulo} />
          <Input placeholder={'Descricao'}{...descricao}/>
          <input type="date"  onChange={({target})=> setDataInput(target.value)}/>
          <button>Enviar</button>
        </form>
        <h4>Minhas metas :</h4>
        {data && data.map((item,index)=>{
          return <span key={index} onClick={()=> handleClick(item)} style={{cursor:'pointer'}}>{item.titulo}</span>
        })}
        {monstrarItemBoolean && 
        <div> 
          <h3>{monstrarItem.descricao}</h3>
          <h4>Tempo Restante:</h4>
          <div style={{display:'flex' , alignItems:'center',gap:'10px'}}> 
            <span className={styles.span}>{dias}<span> dias</span></span>
             
            <span className={styles.span}> {horas }<span> hrs</span> </span>
            <span className={styles.span}> {minutos }<span> mins</span> </span>
            <span className={styles.span}> {segundos } <span> segs</span></span> 
          </div>
        </div>
        }
   </div>
  )
}

export default UserMetas