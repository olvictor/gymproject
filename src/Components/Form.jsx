import React from 'react'
import Input from './Input'

const Form = () => {
  return (
    <form>
         <Input type='email' placeholder={'Digite seu email'} />
         <input type="password" />
    </form>
  )
}

export default Form