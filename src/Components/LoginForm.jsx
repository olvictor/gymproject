import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LoginForm.module.css'
import Input from './Input'
import UseForm from '../CustomHooks/UseForm'


const LoginForm = () => {

  const email = UseForm()
  const senha = UseForm()

  const handleSubmit = (e)=>{
    e.preventDefault()

    fetch('http://localhost:3000/user/login',{
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email:email.value,
        senha:senha.value
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))

  }

  return (
    <div className={styles.loginForm}>
          <form  onSubmit={handleSubmit}>
            <Input type='email' placeholder={'Digite seu email'} label={'Email'} name={email} {...email} />
            <Input type='password' placeholder={'Digite sua senha'} label={'Senha'} name={senha} {...senha}/>
            <button>Entrar</button>
          </form>
        <span>Não possui uma conta ?</span>
        <Link to='/login/registrar'>Registrar</Link>
    </div>

  )
}

export default LoginForm