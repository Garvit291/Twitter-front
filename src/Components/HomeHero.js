import React from 'react'
import hero from '../hero.png'
function HomeHero() {
  return (
    <div className='flex flex-col items-center w-full h-full p-2 bg-purple-600'>
        
        <div className='flex flex-col items-center w-3/5 bg-purple-600 '  >
            <p  className='font-bold text-center text-white text-7xl'>
                Find the right tweet in seconds
            </p>
            <p className='mt-4 text-2xl font-bold text-center text-gray-200'>
                Some catchy line here......
            </p>
        </div>
        <div className='flex items-center justify-center w-3/5 mt-4 space-x-5 bg-purple-600'>
            <button className='w-40 p-2 text-white bg-purple-400 rounded-full '>Pretweet</button>
            <button className='w-40 p-2 text-purple-400 bg-white rounded-full '> Analysis</button>
        </div>
        <div className='w-3/5 h-full'>
            <img className='w-full h-full' src={hero} alt="" />
        </div>
    </div>
  )
}

export default HomeHero