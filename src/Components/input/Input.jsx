import React from 'react'

const Input = ({type,placeholder,label,name, handleChange,error,onblur,icon}) => {
  return (
    <>  
        <label htmlFor={name}>{label}</label>
        <div className='boxInput'> 
          <input 
            type={type} 
            name={name} 
            placeholder={placeholder}
            id={name} 
            onChange={handleChange}
            onBlur={onblur}
            />
          {icon}
        </div>
          {error && <p className='error'>{error}</p>}
    </>
  )
}

export default Input