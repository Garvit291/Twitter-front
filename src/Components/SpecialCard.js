import React from 'react'
import vect from '../Vector.png'
function SpecialCard() {
  return (
    <div className='flex flex-col items-start w-10/12 p-6 py-10 space-y-2 bg-white border-2 border-black rounded-lg '>
        <div className='w-1/5 '>
            <img className='w-10 h-10' src={vect} alt="" />
        </div>
        <h2 className='text-xl font-bold'> Sentiment Analysis</h2>
        <p className='text-black'>Slate helps you see how many 
            more days you need to work 
            to reach your financial goal 
            for the month and year.</p>
        <p className='text-blue-300'> Learn more</p>
    </div>
  )
}

export default SpecialCard