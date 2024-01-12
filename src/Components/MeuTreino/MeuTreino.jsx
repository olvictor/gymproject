import axios from 'axios';
import React, { useState } from 'react'
import { BsFillNodePlusFill } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";
import { useMutation } from 'react-query';

const MeuTreino = () => {
  const token = window.localStorage.getItem("token");
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const teste = [
    {
      musculos: ['Peito,Triceps'],
      dia: 'segunda'
    },
    {
      musculos: ['Ombro,Biceps'],
      dia: 'terca'
    },
    {
      musculos: ['Abdomen,Cardio'],
      dia: 'quarta'
    },
    {
      musculos: ['Ombro,Perna'],
      dia: 'quinta'
    },
    {
      musculos: ['Cardio'],
      dia: 'sexta'
    },
  ]

  const aaa = teste.filter((item)=> item.dia === 'segunda');
  const {musculos: treinoSegunda} = aaa[0]
  const diasDaSemana = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sabado']
  const opcoesDeTreino =['biceps','triceps','peito','ombro','costas','cardio','abdmomen','perna']
  const [dia, setDia] = useState(null)
  const [treinoAdicionado,setTreinoAdicionado] = useState([])
  const [numeroDeOpcoes,setNumeroDeOpcoes] = useState([" "])
 
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
    },onSuccess(data){
      console.log(data)
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
  return (
    <div style={{width:'100%'}}>
      <form onSubmit={handleSubmit}>
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
      </form>
      <div style={{backgroundColor:'red',width:'100%',marginTop:'50px'}}>
          <div>
              {treinoSegunda.map((item)=>{
                return <p>{item}</p>
              })}
          </div>
      </div>
    </div>
  )
}

export default MeuTreino