import React, { useState } from 'react'


const types = {
  email:{
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message:'Digite um email válido'
  }
}


const UseForm = (type) => {
 const [value, setValue] = useState('')
 const [error, setError] = useState(null)
 
 const handleChange = ({target})=>{
   if(error){
     validate(target.value)
   }
   setValue(target.value)
 }

 const validate =(value)=>{
   if(type === false){
     return true
    }
    if(value.length === 0){
      setError('Preencha um valor')
      return false
    }else if(types[type] && !types[type].regex.test(value)){
      setError(types[type].message)
      return false
    }else{
      setError(null);
      return true
    }
    
  }
  
  return {
    value,
    setValue,
    handleChange,
    error,
    validate: () => validate(value),
    onblur: () => validate(value),  
  }
}

export default UseForm