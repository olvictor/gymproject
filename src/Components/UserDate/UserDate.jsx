import React, { useState } from 'react'
import { CiCircleRemove } from "react-icons/ci";
import { useMutation, useQuery} from 'react-query';
import styles from './UserDate.module.css'
import axios from 'axios';
import UserTreinos from '../UserTreinos/UserTreinos';
import { buscarTipoDeTreino, dataGet } from '../../CustomHooks/UseFetch';

const UserDate =  () => {
    const [countInput,setCountInput] = useState([' '])

    const token = window.localStorage.getItem('token')
    const diaAtual = new Date().getDate();
    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();
    const mesesDoAno = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
    const [treinos,setTreinos] = useState([]);
    const {url,options} = dataGet(token);
    const [headerActive,setHeaderActive] = useState(999);

    const {data,refetch} = useQuery('buscarTreinos',async()=>{
        const { url, options} = dataGet(token);
        return await axios.get(url,options).then((response)=> response.data)
    },{
      refetchOnWindowFocus: false,
      initialData: [],
      onSuccess: (data) =>{
        setTreinos(data)
      }
    }
    )   

    const mutation = useMutation({
      mutationFn: async (treino) => {
        return await axios
          .post(url,
            {
              musculos: treino
            },
            options
          )
          .then((response) => response.data);
      },onSuccess :()=>{
        refetch()
        setCountInput([" "])
      }
    });

    const {data: dataTipoDeTreino} = useQuery('buscarTipoDeTreino',async () =>{
      const {url,options} = buscarTipoDeTreino(token);
        return await axios.get(url,options).then((response)=> response.data)
    })

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

    const validarAdiçãoTreino = data && data.filter((item) => new Date(item.data_publicacao).getDate() === diaAtual && new Date(item.data_publicacao).getMonth() === mesAtual && new Date(item.data_publicacao).getFullYear() === anoAtual)
    const arrayMesesOfData = []
    const meses = new Map()
    const mesesMapeados = [];
    const mesesHeader = [];

    for (let i of data  && data){
      arrayMesesOfData.push(new Date(i.data_publicacao).getMonth())
    }

    for (let i of arrayMesesOfData){
          if(!meses.has(mesesDoAno[i])){
             meses.set(mesesDoAno[i], 1)
          }else{
            meses.set(mesesDoAno[i], meses.get(mesesDoAno[i]) + 1)
          }
    }

    for (let [key,value]of meses){
        mesesHeader.push(key);
    }
    const handleClick = (index,item) =>{
      const buscarIndexDoMes = mesesDoAno.indexOf(item)
      if(index === 999){
        setHeaderActive(index)
       return setTreinos(data)
      }

        const novoArray  = data.filter((item) => new Date(item.data_publicacao).getMonth() === buscarIndexDoMes) ;
        setHeaderActive(index)
        setTreinos(novoArray)
    }

    return (
    <div > 
      <div style={{marginTop:'50px'}}>
           {data && validarAdiçãoTreino.length < 1 && 
            <form onSubmit={handleSubmit} className={styles.formUserDate}>
              <h2>Oque você treinou hoje ?</h2>
        
              <div className={styles.formBoxInput}>
                <div>
                  {countInput.map((input, index)=>{
                  return <div key={index}>
                    <CiCircleRemove className={styles.inputRemove} onClick={()=>removeInput(index)}/>
                    <select defaultValue={0} onChange={(e)=> handleChange(index, e.target)}>
                      <option value="0">Selecionar...</option>
                      {dataTipoDeTreino && dataTipoDeTreino.map((treino)=>{
                       return  <option style={{textTransform:'capitalize'}} value={treino.tipo}>{treino.tipo}</option>
                      })}
                    </select>
                  </div>
                  })}
                  </div>
              <span style={{fontSize:'1rem',cursor:'pointer',color:'#1bfaad'}} onClick={()=>{
                setCountInput([...countInput,' '])
              }}>Mais opções .</span>
              </div>
              <button type='submit'>Registrar</button>
            </form>
          }
      </div>
      <div className={styles.headerMeses}>    
        <h4>Filtrar Por Mês: </h4>
        <ul>
          {mesesHeader.map((item,index)=>{
          return <li key={index} onClick={()=> handleClick(index,item)} className={headerActive === index ? `${styles.activeHeader}` : " "} >
                {item}
            </li> 
          })}
          <li onClick={()=> handleClick(999)} className={headerActive === 999 ? `${styles.activeHeader}` : " "}>Mostrar Todos</li>
        </ul>
      </div>

      {treinos && <UserTreinos treinos={treinos} setTreinos={setTreinos} />}
    </div>
  )
}

export default UserDate