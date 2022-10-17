import React from 'react'
import SpecialCard from './SpecialCard'

function Specially() {
  return (
    <div className='flex flex-col items-center w-full h-full p-2 space-y-2 bg-white'>
        <p className='w-5/12 h-full p-2 text-4xl font-semibold text-center text-black '>Pre Twitter is built specially for you</p>
        <div className='flex w-9/12 h-full p-4 space-x-12'>
            <SpecialCard/>
            <SpecialCard/>
            <SpecialCard/>         
        </div>
    </div>
  )
}

export default Specially