import React from 'react'

const Input = ({type,placeholder,label,name, value, handleChange}) => {
  return (
    <>  
        <label htmlFor={name}>{label}</label>
        <input type={type} name={name} placeholder={placeholder} id={name} onChange={handleChange} value={value} />
    </>
  )
}

export default Input