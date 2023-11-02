import React, { useContext, useEffect, useState } from 'react'
import styles from './UserPerfil.module.css'
import { imc } from '../utlilitarios/imc'
import { infoGET } from '../CustomHooks/UseFetch'
import { UserContext } from '../UserContext'
import { calcularTMB } from '../utlilitarios/calcTMB'
import Input from './Input'

const UserPerfil = () => {
  const {data} = useContext(UserContext)

  const [userInfo, setUserInfo] = useState(false)
  const [nome, setNome] = useState(null)
  const [peso , setPeso] = useState(null)
  const [idade , setIdade] = useState(null)
  const [sexo , setSexo] = useState(null)
  const [altura, setAltura] = useState(null)

  
  useEffect(()=>{
    const buscarInformacoes = async() =>{
      const token = window.localStorage.getItem('token')
      
      const {url, options} = infoGET(token)
      
      const response =  await fetch(url,options)
      const json = await response.json()
      setPeso(json.peso)
      setAltura(json.altura)
      setIdade(json.idade)
      setSexo(json.sexo)
      setUserInfo(false)
      
    }
    buscarInformacoes()
    
    
  },[])
  
  const imcINFO = imc(peso,altura);
  const tmb = calcularTMB(peso,sexo,'moderado')
  console.log(tmb)
  const handleSubmit = async () =>{

  }

  return (
    
    <div className={styles.containerPerfil}>
      <h1 className={styles.tituloUser}>Perfil do usuário</h1>
      {!userInfo ?  
        <div>
            <form onSubmit={handleSubmit} className={styles.formINFO}>
                <Input type='text' label='Altura' />
                <Input type='text' label='Peso' />
                <Input type='text' label='Idade' />
                <Input type='text' label='Sexo' />
                <Input type='text' label='Nivel de atividade' />
                <select defaultValue={0}>
                  <option value="0">Selecione o objetivo</option>
                  <option value="1">Manter Peso</option>
                  <option value="2">Ganhar Peso</option>
                  <option value="3">Emagrecer</option>
                </select>
                <select defaultValue={0}>
                  <option value="0">Nivel de atividade</option>
                  <option value="1">Leve</option>
                  <option value="2">Moderado</option>
                  <option value="3">Pesado</option>
                </select>

                <button className={styles.buttonForm}>Enviar</button>
            </form>
        </div>
          : 
      <div className={styles.containerUserInfo}>
              <div className={styles.infoUser}>
                <label>Nome:</label>
                <input type="text" placeholder={data && data.username} disabled/>
              </div>
              <div className={styles.infoUser}>
                <label>idade:</label>
                <input type="text" placeholder={`${idade} anos`} disabled/>
              </div>
              <div className={styles.infoUser}>
                <label>Altura:</label>
                <input type="text" placeholder={`${altura} metros`} disabled/>
              </div>
              <div className={styles.infoUser}>
                <label>Peso:</label>
                <input type="text" placeholder={`${peso} kg`} disabled/>
              </div>
              <div className={styles.infoUser}>
                <label>Sexo:</label>
                <input type="text" placeholder={sexo} disabled/>
              </div>
              <div className={styles.infoUser}>
                <label>Imc:</label>
                <input type="text" placeholder={imcINFO.imc} disabled/>
              </div>
      </div>}
      
</div>
  )
}

export default UserPerfil