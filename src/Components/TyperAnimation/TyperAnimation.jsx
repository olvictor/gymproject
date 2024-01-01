import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const TyperAnimation = ({texto}) => {

  return (
        <TypeAnimation
        sequence={[ 
        '',
        1000,
        texto
      ]}
        wrapper="p"
        speed={60}
        style={{ fontSize: '3.4em', display: 'inline-block', fontWeight:'bolder'}}
        repeat={0}
    />
  )
}

export default TyperAnimation