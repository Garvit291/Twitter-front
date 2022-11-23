import React from 'react'
import hero from '../hero.png'
import cloud1 from '../cloud1.png'
import cloud2 from '../cloud2.png'
import cloud3 from '../cloud3.png'
import cloud4 from '../cloud4.png'
import cloud5 from '../cloud5.png'

function HomeHero() {
  return (
    <div className='relative flex flex-col items-center w-full p-2 overflow-hidden bg-purple-600 bg-cover' style={{height:"50vh"}}>
        
        <div className='flex flex-col items-center w-3/5 bg-purple-600 '  >
            <p  className='font-bold text-center text-white text-7xl'>
                Find the right tweet in seconds
            </p>
            <p className='mt-4 text-2xl font-bold text-center text-gray-200'>
                Some catchy line here.....
            </p>
        </div>
        <div className='flex items-center justify-center w-3/5 mt-4 space-x-5 bg-purple-600'>
            <button className='z-10 w-40 p-2 text-white bg-purple-400 rounded-full '>Pretweet</button>
            <button className='z-10 w-40 p-2 text-purple-400 bg-white rounded-full '> Analysis</button>
        </div>
        <div className="absolute z-0 hidden lg:flex clouds">
            <img src={cloud1} className="cloud1" alt="" />
            {/* <img src={cloud2}  className = "cloud2" alt="" /> */}

            <img src={cloud3} className="cloud3"  alt="" /> 
            <img src={cloud4}  className="cloud4" alt="" />
             <img src={cloud5} className="cloud5"  alt="" />
        </div>
        {/* <div className='w-3/5 h-full'>
            <img className='w-full h-full' src={hero} alt="" />
        </div> */}
    </div>
  )
}

export default HomeHero