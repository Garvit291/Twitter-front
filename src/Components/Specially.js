import React from 'react'
import SpecialCard from './SpecialCard'

function Specially() {
  return (
    <div className='flex flex-col items-center w-full h-full p-2 space-y-2 bg-white'>
        <p className='w-5/12 h-full p-2 text-4xl font-bold text-center text-black '>Pre Twitter is built specially for you</p>
        <div className='flex flex-col w-9/12 h-full p-4 space-x-12 md:flex-row'>
            <SpecialCard/>
            <SpecialCard/>
            <SpecialCard/>         
        </div>
    </div>
  )
}

export default Specially