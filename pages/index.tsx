import { useRouter } from 'next/router'
import Confetti from 'react-confetti'
import React, { useState, useEffect } from "react"
																											
export default function App() {
	const router = useRouter()
        const [objetive, setObjetive] = useState(1000)
	const [currentText, setText] = useState('')
	const [count, setCount] = useState(0)

        useEffect(() => {
            setText(window.localStorage.getItem('text').toString());
            setObjetive(window.localStorage.getItem('objetive').toString());
            setCount(window.localStorage.getItem('count').toString());
        }, []);

        useEffect(() => {
            window.localStorage.setItem('text', currentText.toString());
        }, [currentText]);

        useEffect(() => {
            window.localStorage.setItem('objetive', objetive.toString());
        }, [objetive]);

        useEffect(() => {
            window.localStorage.setItem('count', count.toString());
        }, [count]);
	
	return (
		<main className="flex dark:bg-gray-800 w-screen h-screen">
                        {count == objetive ?
                          <Confetti/>
                           :
                          null
                        }
			<input className="outline-none font-bold text-gray-500 dark:text-gray-300 bg-transparent top-1/4 left-24 text-center absolute" type="text" placeholder="Counter Name" onChange={(text) => {
			  setText(text.target.value)
			}} value={currentText}></input>
			<input type="number" className="outline-none bg-transparent w-48 dark:text-gray-400 text-center text-5xl font-extrabold top-1/3 left-[7.5rem] absolute" placeholder="Number" onChange={(text) => {
			  if((text.target.value.length - 1) < 5) {
			    setCount(text.target.value)
		          }
		  }} value={count}></input>
			<input type="number" className="outline-none bg-transparent w-48 dark:text-gray-400 text-center font-extrabold top-[19rem] left-[7.5rem] absolute" placeholder="Objetive" onChange={(text) => {
			  if((text.target.value.length - 1) < 5) {
			    setObjetive(text.target.value)
		          }
		  }} value={objetive}></input>

			<button className="bottom-0 w-1/2 h-1/4 bg-green-500 fixed" onClick={() => {
			  setCount(parseInt(count) + 1)
			}}>Add</button>
			<button className="right-0 bottom-0 w-1/2 h-1/4 bg-red-500 fixed" onClick={() => {
			  setCount(parseInt(count) - 1)
			}}>Remove</button>
		</main>
	)
}
