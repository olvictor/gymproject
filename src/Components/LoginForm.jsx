import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LoginForm.module.css'
import Input from './Input'
import UseForm from '../CustomHooks/UseForm'
import { userLogin } from '../CustomHooks/UseFetch'


const LoginForm = () => {

  const email = UseForm('email')
  const senha = UseForm()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    
    if(email.validate() && senha.validate()){
      const {options, url} = userLogin({
        email:email.value,
        senha:senha.value
      })

      const response =  await fetch(url,options)
      const json = await response.json()
      if(response.ok){
        window.localStorage.setItem('token',json.token)
      }
    }

  }

  return (
    <div className={styles.loginForm}>
      <h1 className={styles.titulo}>LOGIN</h1>
          <form  onSubmit={handleSubmit}>
            <Input type='email' placeholder={'xx@xxxx.com'} label={'Email'} name={email} {...email} />
            <Input type='password' placeholder={'****'} label={'Senha'} name={senha} {...senha}/>
            <button className={styles.buttonForm}>Entrar</button>
          </form>
        <div className={styles.link}>
        <span>Não possui uma conta ?</span>
        <Link className={styles.linkRegistrar} to='/login/registrar'>Registrar</Link>
        </div>
    </div>

  )
}

export default LoginForm