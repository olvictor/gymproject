import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const TyperAnimation = ({texto}) => {

  return (
        <TypeAnimation
        sequence={[
        // Same substring at the start will only be typed out once, initially
        '',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        `${texto}`,
        1000,
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: '3em', display: 'inline-block', fontWeight:'bolder'}}
        repeat={0}
    />
  )
}

export default TyperAnimation