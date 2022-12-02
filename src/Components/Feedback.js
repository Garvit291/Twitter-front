import React, { useState } from 'react'
import axios from 'axios';
function Feedback() {
    const [email,setEmail] = useState("");
    const [message,setmessage] = useState("");
    const [subject,setsubject] = useState("");

    const nameHandler = (e) =>{
        setEmail(e.target.value);
    }

    const subjectHandler = (e) =>{
        setsubject(e.target.value);
    }

    const messageHandler = (e) =>{
        setmessage(e.target.value);
    }
    const handleSubmit = async ()=>{
        const feedback = {email:email,
            subject: subject,
            message: message};
            try{
                const res = await axios.post('http://localhost:3001/api/feedbacks',feedback)
                    .then(setEmail(""))
                    .then(setsubject(""))
                    .then(setmessage(""))
                    .then(window.alert("Success"))
            }
            catch(err){
                window.prompt(err);
                console.log(err);
            }

    }
    return (
        <>
            <section class="bg-white ">
                <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 ">Your Feedbck is valuable</h2>
                    <p class="mb-8 lg:mb-16 font-light text-center text-gray-500  sm:text-xl">Got any issue? Want to send feedback about a feature? Need details ? Let us know.</p>
                    <form action="#" class="space-y-8">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                            <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="name@flowbite.com" required 
                            onChange={(e)=>nameHandler(e)}
                                value = {email}
                            />
                        </div>
                        <div>
                            <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 ">Subject</label>
                            <input type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 " placeholder="Let us know how we can help you" required
                                onChange={(e)=>subjectHandler(e)}
                                value = {subject}
                            />
                        </div>
                        <div class="sm:col-span-2">
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">Your message</label>
                            <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 " placeholder="Leave a comment..."
                            onChange={(e)=>messageHandler(e)}

                            value = {message}
                            ></textarea>
                        </div>
                        <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white bg-blue-400 rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSubmit}>Send message</button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Feedback