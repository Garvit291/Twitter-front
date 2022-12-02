import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { MicrophoneIcon } from '@heroicons/react/solid'

import { classNames } from './shared/Utils'
import { TwitterShareButton } from 'react-twitter-embed';
import Loader from './Loader';



const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new speechRecognition();



mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US'

function Tweet() {

  const [isListening, setIsListening] = useState(false)
  const [search, setSearch] = useState('');
  const [text, setText] = useState('');
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  }
  const [data, setData] = useState();
  const [result, setResult] = useState();
  const [isLoading , setIsLoading] = useState(false)

  useEffect(() => {
    if (data) {
      setResult(data)
    }
  }, [data])


  useEffect(() => {
    handleListen()

  }, [isListening])



  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    }
    else {
      mic.stop()
      mic.onend = () => {
        console.log('mic stopped');
      }
    }

    mic.onstart = () => {
      console.log('mics on');
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript).join('')
      console.log(transcript)
      setSearch(transcript)
      mic.onerror = event => {
        console.log(event.error);
      }
    }

  }

  const fetchResults = async () => {
    if (search === '') {
      window.prompt('cant search for empty');
      return;
    }
    setResult();
    setData();

    try{
      setIsLoading(true)
      const results = await axios.get(`http://localhost:5000/sentiment/user/${search}`)
      .then(res => setData(res.data))
    }
    catch(err){
      window.prompt('try another input ')
    }

    setIsLoading(false)

    

  }

  return (
    <div className='w-full p-6 space-y-4 bg-white' style={{ minHeight: "75vh" }}>
      <div className='flex justify-center w-full '>
        <h1 className='text-4xl font-extrabold tracking-tight text-center text-gray-900'>Enter the input tweet or use mic</h1>
      </div>
      <div className='flex flex-col w-full px-16 mt-12 space-y-4'>
        <textarea type='text' value={search} onChange={e => handleSearchChange(e)} placeholder='Enter tweet' maxLength="130"
          className='w-full h-40 p-4 text-xl text-gray-700 bg-white border-2 border-gray-400 rounded-lg outline-none' />
        <div className='flex justify-end w-full space-x-4'>
          <button className={`w-16 h-16 p-3 border-2 border-red-200 rounded-full outline-none ${isListening ? 'bg-red-400' : 'bg-gray-400'}`}
            onClick={() => setIsListening(prevState => !prevState)}
          >
            <MicrophoneIcon color='black' />
          </button>
          <button className='w-40 p-2 text-white bg-purple-400 rounded-full ' onClick={fetchResults} > Get tweet analysis</button>
        </div>
      </div>

      <div className="flex justify-center w-full p-6 ">
        {result ? (<>
          <div className='flex flex-col items-center px-4 py-2 text-3xl w-min '>
            <h1 className={
              classNames(
                "px-3 py-1 uppercase leading-2 text-center font-bold rounded-full shadow-sm",
                result.res.startsWith("Positive") ? "bg-green-100 text-green-800" : null,
                result.res.startsWith("Neutral") ? "bg-yellow-100 text-yellow-800" : null,
                result.res.startsWith("Negative") ? "bg-red-100 text-red-800" : null,
              )
            }>{result.res}</h1>

            <div className='flex justify-center p-2 text-3xl'>

              <div className="centerContent">
                <div className="selfCenter spaceBetween">
                  <TwitterShareButton
                    onLoad={function noRefCheck() { }}
                    options={{
                      size: 'large',
                      text: search,
                      via :"Pretwitter"
                    }}
                    url="pretwitter link"
                  />
                </div>
              </div>
            </div>
          </div>
        </>)
          : isLoading ? <Loader/> : null}
      </div>
    </div>
  )
}

export default Tweet