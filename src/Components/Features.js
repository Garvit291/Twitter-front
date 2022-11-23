import React from 'react'
import Feature from './Feature'
import Trending from './Trending'

function Features() {
  return (
    <div className='flex flex-col items-center w-full h-full p-4 space-y-6 bg-white'>
        <Feature/>
        <Trending/>
        <Feature/>

    </div>
  )
}

export default Features