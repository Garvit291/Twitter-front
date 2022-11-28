import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Piechart from '../Components/Piechart';
import classNames from 'classnames';

import { MicrophoneIcon } from '@heroicons/react/solid'
import Table, { bold, multi, StatusPill } from '../Components/Table';
import { TwitterHashtagButton } from 'react-twitter-embed';




const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new speechRecognition();



mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US'

function SourceCode() {

  const [isListening, setIsListening] = useState(false)
  const [search, setSearch] = useState('');
  const [text, setText] = useState('');
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }
  const [data, setData] = useState();
  const [result, setResult] = useState();

  const cols = [

    {
      Header: "Sentiment Analysis",
      accessor: 'Analysis',
      Cell: StatusPill,
    },
    {
      Header: "Likes",
      accessor: 'Favorites',
    },

    {
      Header: "Polarity",
      accessor: 'Polarity',
    },
    {
      Header: "User name",
      accessor: 'user name',
      Cell: bold
    },
    {
      Header: "Tweet",
      accessor: 'Tweets',
      Cell: multi
    },
    {
      Header: "Subjectivity",
      accessor: 'Subjectivity',
    },
  ]

  useEffect(() => {
    if (data) {


      setResult(data.max);



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
      window.alert('cant search for empty');
      return;
    }
    setResult();
    setData();
    try {
      const results = await axios.get(`http://localhost:5000/sentiment/${search}`)
        .then(res => setData(res.data))
    }
    catch (err) {
      window.alert("Some error in fetching please try another input")
    }


  }



  return (
    <>
      <div className='w-full p-6 space-y-4 bg-white ' style={{ minHeight: "75vh" }}>
        <div className='flex justify-center w-full '>
          <h1 className='text-4xl font-extrabold text-gray-400 '>Enter the input or use mic</h1>
        </div>
        <div className='flex flex-col w-full px-16 mt-12 space-y-4'>
          <textarea type='text' value={search} onChange={e => handleSearchChange(e)} placeholder='Enter Keyword'
            className='w-full h-40 p-2 pt-0 text-gray-400 bg-white border-2 border-gray-400 rounded-lg outline-none' />
          <div className='flex justify-end w-full space-x-4'>
            <button className={`w-16 h-16 p-3 border-2 border-red-200 rounded-full outline-none ${isListening ? 'bg-red-400' : 'bg-gray-400'}`}
              onClick={() => setIsListening(prevState => !prevState)}
            >
              <MicrophoneIcon color='black' />
            </button>
            <button className='w-40 p-2 text-white bg-purple-400 rounded-full ' onClick={fetchResults} > Get analysis</button>
          </div>
        </div>

        {result ? (<>
          <div className="flex flex-col items-center w-full p-4 ">
            <div className='flex justify-center w-full px-4 py-2 text-3xl '>
              <h1 className={
                classNames(
                  "px-3 py-1 text-3xl font-bold rounded-full shadow-sm",
                  result == "very_good" ? "bg-green-100 text-green-800" : null,
                  result == "good" ? "bg-green-100 text-green-800" : null,
                  result == "neutral" ? "bg-yellow-100 text-yellow-800" : null,
                  result == "bad" ? "bg-green-100 text-green-800" : null,
                  result == "very_bad" ? "bg-red-100 text-red-800" : null,
                )
              }>{result}</h1>

              <div className='flex justify-center p-2 text-3xl'>

                <div className="centerContent">
                  <div className="selfCenter spaceBetween">
                    <TwitterHashtagButton
                      onLoad={function noRefCheck() { }}
                      options={{
                        size: 'large'
                      }}
                      tag={search}
                    />
                  </div>
                </div>
              </div>


            </div>
            <div className='flex justify-center w-full'>
              <Piechart data={data} />

            </div>
            <Table columns={cols} data={data.database} />
          </div>
        </>)
          : null}
      </div>
    </>
  )
}

export default SourceCode