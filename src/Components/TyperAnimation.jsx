import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const TyperAnimation = ({texto}) => {

  const element = <p>tesads</p>

  return (
        <TypeAnimation
        sequence={[
        // Same substring at the start will only be typed out once, initially
        '',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        texto,
      ]}
        wrapper="p"
        speed={50}
        style={{ fontSize: '2.6em', display: 'inline-block', fontWeight:'bolder'}}
        repeat={0}
    />
  )
}

export default TyperAnimation