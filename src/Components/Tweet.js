import React, { useEffect, useState } from 'react'
import axios from 'axios';

import {MicrophoneIcon } from '@heroicons/react/solid'


const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition ;
const mic = new speechRecognition();



mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US'

function Tweet() {

  const [isListening , setIsListening] = useState(false)
  const [search , setSearch] = useState('');
  const [text , setText] = useState('');
  const handleSearchChange = (e) =>{
      setSearch(e.target.value);
      console.log(search);
  }
  const [data , setData] = useState();
  const [result , setResult] = useState();

  useEffect(()=>{
    if(data){
    setResult(data)
    }
  },[data])
  

  useEffect(()=>{
    handleListen()

  },[isListening])

  

  const handleListen = () =>{
    if(isListening){
      mic.start()
      mic.onend=()=>{
        console.log('continue..')
        mic.start()
      }
    }
    else{
      mic.stop()
      mic.onend=()=>{
        console.log('mic stopped');
      }
    }

    mic.onstart = () =>{
      console.log('mics on');
    }

    mic.onresult = event =>{
      const transcript = Array.from(event.results)
      .map(result=>result[0])
      .map(result=>result.transcript).join('')
      console.log(transcript)
      setSearch(transcript)
      mic.onerror = event =>{
        console.log(event.error);
      }
    }

  }

  const fetchResults = async () =>{
    if(search===''){
      window.prompt('cant search for empty');
      return;
    }
    setResult();
    setData();

    const results = await axios.get(`http://localhost:5000/sentiment/user/${search}`)
    .then(res=> setData(res.data))

  }
  
  return (
    <div className='w-full p-6 space-y-4 bg-white' style={{minHeight:"75vh"}}>
      <div className='flex justify-center w-full '>
        <h1 className='text-4xl font-extrabold text-gray-400 '>Enter the input tweet or use mic</h1>
      </div>
      <div className='flex flex-col w-full px-16 mt-12 space-y-4'>
        <input type='text' value={search} onChange={e=>handleSearchChange(e)} placeholder='Enter Keyword' 
        className='w-10/12 h-40 p-4 text-gray-400 bg-white border-2 border-gray-400 rounded-lg outline-none'/>
        <div className='flex justify-end w-10/12 space-x-4'>
          <button className={`w-16 h-16 p-3 border-2 border-red-200 rounded-full outline-none ${isListening ?'bg-red-400' : 'bg-gray-400'}`}
            onClick={()=> setIsListening(prevState=>!prevState)}
          >
            <MicrophoneIcon color ='black'/>
          </button>  
          <button className='w-40 p-2 text-white bg-purple-400 rounded-full ' onClick={fetchResults} > Get tweet analysis</button>
        </div>
      </div>
      
      <div className="p-6 ">
        {result?(<>
        <h1>{result.res}</h1>
          
          </>) 
        :null}
      </div>
    </div>
  )
}

export default Tweet