import React from 'react'
import map from "../map.png";

function Footer() {
  return (
    <div className='flex items-center justify-center w-full p-6 px-16 space-x-4 bg-blue-800 '>
      <div className="w-2/5 space-y-8 text-white">
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          <p>Lorem ipsum dolor sit amet consectetur.</p>

      </div>
      <div className="w-1/5">
        <img src={map} className='w-full ' alt="" />
      </div>
      <div className="flex flex-col w-2/5 px-4 space-y-8 text-xl font-semibold text-white">
        <p>Adress Adtres Adresss </p>
        <p> 91 9060123347</p>
        
      </div>
    </div>
  )
}

export default Footer