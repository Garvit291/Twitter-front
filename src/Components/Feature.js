import React from 'react'
import feature from '../feature.png'

function Feature() {
  return (
    <div className='flex w-3/5 space-y-2 bg-white '>
        <div className='flex flex-col w-2/5 pt-6'>
            <p className='text-2xl font-extrabold '>Quick And Easy Process</p>
            <p className='my-6 font-semibold'>Lorem ipsum  quod vero, quas lam nemo cumque natus, ea architecto nesciunt cum.</p>
            <button className='w-40 p-2 text-white bg-purple-400 rounded-full'> Check</button>
        </div>
        <div className='w-3/5'>
          <img src={feature} className='w-full'/>
        </div>
    </div>
  )
}

export default Feature