import React from 'react'

const Input = ({type,placeholder,label,name, handleChange,error,onblur,validate}) => {
  return (
    <>  
        <label htmlFor={name}>{label}</label>
        <input 
          type={type} 
          name={name} 
          placeholder={placeholder}
          id={name} 
          onChange={handleChange}
          onBlur={onblur}
          />
        {error && <p>{error}</p>}
    </>
  )
}

export default Input