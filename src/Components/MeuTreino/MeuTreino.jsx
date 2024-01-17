import axios from 'axios';
import React, { useState } from 'react'
import { BsFillNodePlusFill } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";
import { MdOutlineSettings } from "react-icons/md";
import { useMutation, useQuery } from 'react-query';
import styles from './MeuTreino.module.css';
import Loading from "../loading/Loading";

const MeuTreino = () => {
  const token = window.localStorage.getItem("token");
  const [abrirFormulario,setAbrirFormulario] = useState(false)
  const [treinoSegunda,setTreinoSegunda] = useState([]);
  const [treinoTerça,setTreinoTerça] = useState([]);
  const [treinoQuarta,setTreinoQuarta] = useState([]);
  const [treinoQuinta,setTreinoQuinta] = useState([]);
  const [treinoSexta,setTreinoSexta] = useState([]);
  const [treinoSabado,setTreinoSabado] = useState([]);
  const [treinoDomingo,setTreinoDomingo] = useState([]);
  
  const diasDaSemana = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sabado']
  const opcoesDeTreino =['biceps','triceps','peito','ombro','costas','cardio','abdmomen','perna']
  const [dia, setDia] = useState(null)
  const [treinoAdicionado,setTreinoAdicionado] = useState([])
  const [numeroDeOpcoes,setNumeroDeOpcoes] = useState([" "])
  
  const diaDeHoje =  new Date().getDay()

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
 
  const {data, isLoading,refetch} = useQuery('buscarTreino',
  async () =>{
    return await axios.get('http://localhost:3000/user/treino_semanal',axiosConfig).then((response)=> response.data)
  },{
    onSuccess: (data) => {
      const treinoSegunda = data.filter((item)=> item.dia_da_semana === 'segunda-feira');
      setTreinoSegunda(treinoSegunda)
      
      const treinoTerça = data.filter((item)=> item.dia_da_semana === 'terça-feira');
      setTreinoTerça(treinoTerça)

      const treinoQuarta = data.filter((item)=> item.dia_da_semana === 'quarta-feira');
      setTreinoQuarta(treinoQuarta)

      const treinoQuinta = data.filter((item)=> item.dia_da_semana === 'quinta-feira');
      setTreinoQuinta(treinoQuinta)

      const treinoSexta = data.filter((item)=> item.dia_da_semana === 'sexta-feira');
      setTreinoSexta(treinoSexta)

      const treinoSabado = data.filter((item)=> item.dia_da_semana === 'sabado');
      setTreinoSabado(treinoSabado)

      const treinoDomingo = data.filter((item)=> item.dia_da_semana === 'domingo');
      setTreinoDomingo(treinoDomingo)
    }
  }
  )

 
  const removeropcao = (indice) =>{
    const novoArray = numeroDeOpcoes.splice(1,indice)
    setNumeroDeOpcoes(novoArray)
  }
  
  const adicionarTreino = (item) =>{

    if(item !== '0' && !treinoAdicionado.includes(item)){
      setTreinoAdicionado([...treinoAdicionado, item])
    }

  }

  const mutation = useMutation({
    mutationFn : async (dados)=>{
      return await  axios.post('http://localhost:3000/user/treino_semanal',dados,axiosConfig).then((response) => response.data)
    },onSuccess(){
      refetch()
    }
  })

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const dados = {
      dia_da_semana : dia,
      musculos : treinoAdicionado
    }
    mutation.mutate(dados)
  }


  if(isLoading){
    return <Loading />
  }
  console.log(diasDaSemana[diaDeHoje])
  return (
    <div style={{width:'100%'}}>
      <button className={styles.buttonConfigTreino} onClick={()=>setAbrirFormulario(!abrirFormulario)}>Configurar Treino <MdOutlineSettings /></button>
      {abrirFormulario && <form className={styles.formMeuTreino} onSubmit={handleSubmit}>
        <h4>Selecione o treino :</h4>
        {numeroDeOpcoes.map((item,indice)=>{
          return <div>
          <select onChange={(e)=> adicionarTreino(e.target.value)}>
            <option value="0">Selecionar...</option>
            {opcoesDeTreino.map((i)=>{
              return <option value={i}>{i}</option>
            })}
          </select>
            <BsFillNodePlusFill onClick={()=> setNumeroDeOpcoes([...numeroDeOpcoes," "])}/>
            <CiCircleRemove onClick={() => removeropcao(indice)}/>
          </div>
        })}
        <select onChange={((e)=> setDia(e.target.value))}>
          <option value="0">Selecionar o dia...</option>
          {diasDaSemana.map((item)=>{
            return <>
            <option value={item}>{item}</option>
            </>
          })}
        </select>
        <button>REGISTRAR</button>
      </form>}
      <div className={styles.colunasDeTreino}>
              {treinoSegunda.map((item)=>{
                const treino = item.treino.split(',')
                return <div className={diasDaSemana[diaDeHoje] === item.dia_da_semana ? `${styles.colunaDeTreinoAtiva}`  : `${styles.colunaDeTreino}`}  >
                  <h2>{item.dia_da_semana}</h2>
                  {treino.map((i)=>{
                    return <p>{i}</p>
                  })}
                </div>
              })}  
              {treinoTerça.map((item)=>{
                const treino = item.treino.split(',')
                return <div className={diasDaSemana[diaDeHoje] === item.dia_da_semana ? `${styles.colunaDeTreinoAtiva}`  : `${styles.colunaDeTreino}`} >
                  <h2>{item.dia_da_semana}</h2>
                  {treino.map((i)=>{
                    return <p>{i}</p>
                  })}
                </div>
              })}
     
     
              {treinoQuarta.map((item)=>{
                const treino = item.treino.split(',')
                return <div className={diasDaSemana[diaDeHoje] === item.dia_da_semana ? `${styles.colunaDeTreinoAtiva}`  : `${styles.colunaDeTreino}`} >
                  <h2>{item.dia_da_semana}</h2>
                  {treino.map((i)=>{
                    return <p>{i}</p>
                  })}
                </div>
              })}

              {treinoQuinta.map((item)=>{
                const treino = item.treino.split(',')
                return <div className={diasDaSemana[diaDeHoje] === item.dia_da_semana ? `${styles.colunaDeTreinoAtiva}`  : `${styles.colunaDeTreino}`} >
                  <h2>{item.dia_da_semana}</h2>
                  {treino.map((i)=>{
                    return <p>{i}</p>
                  })}
                </div>
              })}
    
              {treinoSexta.map((item)=>{
                const treino = item.treino.split(',')
                return <div className={diasDaSemana[diaDeHoje] === item.dia_da_semana ? `${styles.colunaDeTreinoAtiva}`  : `${styles.colunaDeTreino}`} >
                  <h2>{item.dia_da_semana}</h2>
                  {treino.map((i)=>{
                    return <p>{i}</p>
                  })}
                </div>
              })}
              {treinoSabado.map((item)=>{
                const treino = item.treino.split(',')
                return <div className={diasDaSemana[diaDeHoje] === item.dia_da_semana ? `${styles.colunaDeTreinoAtiva}`  : `${styles.colunaDeTreino}`} >
                  <h2>{item.dia_da_semana}</h2>
                  {treino.map((i)=>{
                    return <p>{i}</p>
                  })}
                </div>
              })}
              {treinoDomingo.map((item)=>{
                const treino = item.treino.split(',')
                return <div className={diasDaSemana[diaDeHoje] === item.dia_da_semana ? `${styles.colunaDeTreinoAtiva}`  : `${styles.colunaDeTreino}`} >
                  <h2>{item.dia_da_semana}</h2>
                  {treino.map((i)=>{
                    return <p>{i}</p>
                  })}
                </div>
              })}
      </div>
    </div>
  )
}

export default MeuTreino