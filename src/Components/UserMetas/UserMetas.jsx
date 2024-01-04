import React, { useState } from 'react'
import calcTempo  from '../../utlilitarios/calcTempo'
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../loading/Loading';
import styles from './UserMetas.module.css';
import vector from '../../Assets/Vector.svg';
import UseForm  from '../../CustomHooks/UseForm';
import FormMetas from '../formMetas/FormMetas';

const UserMetas = () => {
  const token = window.localStorage.getItem("token");

  const [dataFinalMeta, setDataFinalMeta] = useState('')
  const [dataInput,setDataInput] = useState('')
  const [monstrarItemBoolean,setMostrarItemBoolean] = useState(false)
  const [openModalForm, setOpenModalForm] = useState(false)
  const [monstrarItem, setMonstrarItem] = useState(null)    
  const {dias ,horas ,minutos ,segundos} =  calcTempo(new Date(), new Date(dataFinalMeta));

  const titulo = UseForm()
  const descricao = UseForm()

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
  
  const handleClick = (item) =>{
      console.log(item,monstrarItem)
      setMostrarItemBoolean(true)
      setMonstrarItem(item)
      setDataFinalMeta(item.data_fim)
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

  if(isLoading){
    return <Loading />
  }  



  return (
    <div className={styles.userMetas}>
        {/* <form onSubmit={handleSubmit}>
          <Input placeholder={'Titulo'} {...titulo} />
          <Input placeholder={'Descricao'}{...descricao}/>
          <input type="date"  onChange={({target})=> setDataInput(target.value)}/>
          <button>Enviar</button>
        </form> */}
        
        <div className={styles.boxMetas}>
          <h4>Minhas metas :</h4>
            <div style={{marginTop:'50px'}}>
              {data && data.map((item,index)=>{
                return <div key={index} onClick={()=> handleClick(item)} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:'10px'}}>
                  <span style={monstrarItem ? {color: item.id ===  monstrarItem.id ? '#1BFAAD' : '#fff'} : {color: '#fff'}}>{item.titulo}</span>
                  <img src={vector} alt="vector" height={24} />
                </div>
              })}
            </div>
        </div>
        
        {monstrarItemBoolean && 
        <div className={styles.boxMetaInfo}> 
          <div className={styles.boxMetaInfoItems}>
            <h3>{monstrarItem.descricao}</h3>
            <h4 style={{fontSize:'2rem',color:'#56C39D'}}>Tempo Restante:</h4>
            <div style={{display:'flex' , alignItems:'center',gap:'10px'}}>
              <span className={styles.timer}>{dias}<span> dias</span></span> 
              <span className={styles.timer}> {horas}<span> hrs</span> </span> 
              <span className={styles.timer}> {minutos}<span> mins</span> </span>
              <span className={styles.timer}> {segundos} <span> segs</span></span> 
            </div>
          </div>
        </div>
        }
        {openModalForm && <FormMetas setOpenModalForm={setOpenModalForm} />}
   </div>
  )
}

export default UserMetas