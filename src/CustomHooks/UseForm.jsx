import React, { useState } from 'react'

const UseForm = () => {
 const [value, setValue] = useState(null)

 const handleChange = ({target}) =>{
    setValue(target.value)
 }

  return {
    value,
    setValue,
    handleChange
  }
}

export default UseForm