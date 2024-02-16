import React, { useState } from 'react'
import calcTempo  from '../../utlilitarios/calcTempo'
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../loading/Loading';
import styles from './UserMetas.module.css';
import vector from '../../Assets/Vector.svg';
import FormMetas from '../formMetas/FormMetas';
import { userMetas } from '../../CustomHooks/UseFetch';

const UserMetas = () => {
  const token = window.localStorage.getItem("token");

  const [dataFinalMeta, setDataFinalMeta] = useState('')

  const [monstrarItemBoolean,setMostrarItemBoolean] = useState(false)
  const [openModalForm, setOpenModalForm] = useState(false)
  const [monstrarItem, setMonstrarItem] = useState(null)    
  const {dias ,horas ,minutos ,segundos} =  calcTempo(new Date(), new Date(dataFinalMeta));

  const { url,options} = userMetas(token)

  const {data ,isLoading,refetch} = useQuery('buscarMetas', async()=>{
   return  await axios.get(url, options).then((response)=> response.data)},{
    refetchOnWindowFocus:false,
    retry:false
  })
  
  const handleClick = (item) =>{
      setMostrarItemBoolean(true)
      setMonstrarItem(item)
      setDataFinalMeta(item.data_fim)
  }

  if(isLoading){
    return <Loading />
  }  

  console.log(data)


  return (
    <div className={styles.userMetas}>
        <div className={styles.linkModalForm}>
          <button className={styles.buttonNovaMeta} onClick={()=> setOpenModalForm(true)}>Adicionar nova meta .</button>
        </div>
        <div className={styles.boxMetas}>
         {data.length > 0 &&  <h4>Minhas metas :</h4>}
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
        {openModalForm && <FormMetas setOpenModalForm={setOpenModalForm} refetch={refetch}/>}
   </div>
  )
}

export default UserMetas