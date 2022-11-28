import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { MicrophoneIcon } from '@heroicons/react/solid'

import { classNames } from './shared/Utils'
import { TwitterFollowButton } from 'react-twitter-embed';
import Table, { StatusPill2 } from './Table';



const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new speechRecognition();





mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US'

function User() {

    const [isListening, setIsListening] = useState(false)
    const [search, setSearch] = useState('');
    const [text, setText] = useState('');
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        console.log(search);
    }
    const [data, setData] = useState();
    const [result, setResult] = useState();

    useEffect(() => {
        if (data) {
            setResult(data)
        }
    }, [data])


    useEffect(() => {
        handleListen()

    }, [isListening])


    const cols = [

        {
          Header: "Sentiment Analysis",
          accessor: 'Analysis',
          Cell: StatusPill2,
        },
        
    
        {
          Header: "Polarity",
          accessor: 'Polarity',
        },
       
        {
          Header: "Tweet",
          accessor: 'Tweets',
          
        },
        {
          Header: "Subjectivity",
          accessor: 'Subjectivity',
        },
      ]



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

        try {
            const results = await axios.get(`http://localhost:5000/sentiment/userid/${search}`)
                .then(res => setData(res.data))
        }

        catch (err) {
            window.alert("Username doesnt exist")
        }



    }

    return (
        <div className='w-full p-6 space-y-4 bg-white' style={{ minHeight: "75vh" }}>
            <div className='flex justify-center w-full '>
                <h1 className='text-4xl font-extrabold text-gray-400 '>Enter Twitter username </h1>
            </div>
            <div className='flex justify-around w-full px-16 mt-12 space-x-2'>
                <input type='text' value={search} onChange={e => handleSearchChange(e)} placeholder='Enter Keyword'
                    className='w-10/12 h-24 p-4 text-gray-400 bg-white border-2 border-gray-400 rounded-lg outline-none' />
                <div className='flex items-center justify-end w-2/12 space-x-4'>
                    <button className={`w-16 h-16 p-3 border-2 border-red-200 rounded-full outline-none ${isListening ? 'bg-red-400' : 'bg-gray-400'}`}
                        onClick={() => setIsListening(prevState => !prevState)}
                    >
                        <MicrophoneIcon color='black' />
                    </button>
                    <button className='h-16 p-2 text-white bg-purple-400 rounded-full w-30 ' onClick={fetchResults} > Get User analysis</button>
                </div>
            </div>

            <div className="flex justify-center w-full p-6 ">
                {result ? (<>
                    <div className='flex flex-col items-center w-full px-4 py-2 text-3xl '>
                        <h1 className={
                            classNames(
                                "px-3 py-1 uppercase leading-2 text-center font-bold rounded-full shadow-sm",
                                result.max.startsWith("positive") ? "bg-green-100 text-green-800" : null,
                                result.max.startsWith("neutral") ? "bg-yellow-100 text-yellow-800" : null,
                                result.max.startsWith("negative") ? "bg-red-100 text-red-800" : null,
                            )
                        }>{result.max}</h1>

                        <div className='flex justify-center p-2 text-3xl'>

                            <div className="centerContent">
                                <div className="selfCenter spaceBetween">
                                    <TwitterFollowButton
                                        onLoad={function noRefCheck() { }}
                                        screenName={search}
                                    />
                                </div>
                            </div>
                        </div>
                        <Table columns={cols} data={data.output} />
                    </div>
                </>)
                    : null}
            </div>
        </div>
    )
}

export default User