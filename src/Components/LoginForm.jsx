import React, { useContext, useEffect } from 'react'
import { Link, json } from 'react-router-dom'
import styles from './LoginForm.module.css'
import Input from './Input'
import UseForm from '../CustomHooks/UseForm'
import { UserContext } from '../UserContext'


const LoginForm = () => {

  const email = UseForm('email')
  const senha = UseForm()
  const {loginUser, error, loading} = useContext(UserContext)
  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    
    if(email.validate() && senha.validate()){
      loginUser(
        email.value,
        senha.value
      )  
    }
}
  return (
    <div className={styles.loginForm}>
      <h1 className={styles.titulo}>LOGIN</h1>
          <form  onSubmit={handleSubmit}>
            <Input type='email' placeholder={'********'} label={'Email'} name={email} {...email} />
            <Input type='password' placeholder={'****'} label={'Senha'} name={senha} {...senha}/>
            {error ? <p className='error'>{error}</p> : ''}
            <button disabled={loading ? true : false} className={styles.buttonForm}>Entrar</button>
          </form>
        <div className={styles.link}>
        <span>Não possui uma conta ?</span>
        <Link className={styles.linkRegistrar} to='/login/registrar'>Registrar</Link>
        </div>
    </div>

  )
}

export default LoginForm