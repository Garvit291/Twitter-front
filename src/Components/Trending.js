import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Loader from './Loader';





function Trending() {



    const [hashtags , setHashtags] = useState([]);
    const [isLoading , setIsLoading] = useState(false)

    const  fetchTrendingHashtags =  async() =>{

        try{
            setIsLoading(true)
            const result = await axios.get('http://127.0.0.1:5000/tophashtags').
        then(result=>setHashtags(result.data))
        }
        catch(err){
            console.log(err);
        }

        setIsLoading(false)
        
        
       
    }

    const fetchMinute=()=>{
        let current = new Date();
        console.log(current.getMinutes());

    }

     useEffect (()=>{
        fetchTrendingHashtags()
    },[])
  return (
    <div className='w-3/5 p-4 space-y-2 bg-white border-4 border-blue-300 border-solid '>
        <div className='flex justify-center w-full text-3xl font-bold text-blue-400 '>
           Trending Hashtags of india
        </div>

        <div className='flex container flex-col w-full space-y-2 overflow-scroll max-h-[300px]'>
            {hashtags?
            (
            <>
            {hashtags.map((hashtag , i)=>{
                return(
                    <div key={i} className='w-full p-2 space-y-2 text-2xl font-semibold text-white bg-blue-400'>
                        {hashtag}
                    </div>
                )
            })}
            </>): isLoading ? <div  className='w-full p-2 space-y-2 text-2xl font-semibold text-white bg-blue-400'>
                        Loading...
                    </div> : null}
            
        </div>
        
    </div>
  )
}

export default Trending