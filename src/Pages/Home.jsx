import React from 'react'
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
  return (
    <div>
      <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        '',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Se for para sofrer que seja na academia. Lá a dor traz resultados.',
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={0}
    />
    </div>
  )
}

export default Home