import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react"
import Confetti from 'react-confetti'
import {
  useWindowSize,
} from '@react-hook/window-size'

export async function getServerSideProps({ query }) {
  let { objetive=1000, count=0, title='', timer=0 } = query
	
	const queries = {
		count,
		objetive,
		title,
		timer
	}
	
	return {
		props: {
			queries
		}
	}
}
																														
export default function App({ queries }) {
	const router = useRouter()
	const [width, height] = useWindowSize()
	
	function save(title, count, objetive, timer) {
	  router.push(
	  {
		  query: {
		    title,
		    count,
				objetive,
				timer
  	  }
	  }, undefined, {
		  shallow: true
	  })
  }

	const [objetive, setObjetive] = useState(queries.objetive)
	const [currentText, setText] = useState(queries.title)
	const [count, setCount] = useState(queries.count)
	
	return (
		<main className="flex dark:bg-gray-800 w-screen h-screen">
			<Confetti
        width={width}
        height={height}
				numberOfPieces={count == objetive ? 200 : 0}
      />
			<input className="outline-none font-bold text-gray-500 dark:text-gray-300 bg-transparent top-1/4 left-24 text-center absolute" type="text" placeholder="Counter Name" onChange={(text) => {
			  setText(text.target.value)
			  save(currentText, count, objetive, timer)
			}} value={currentText}></input>
			<input type="number" className="outline-none bg-transparent w-48 dark:text-gray-400 text-center text-5xl font-extrabold top-1/3 left-[7.5rem] absolute" placeholder="Number" onChange={(text) => {
			  if((text.target.value.length - 1) < 5) {
			    setCount(text.target.value)
					save(currentText, count, objetive, timer)
		    }
		  }} value={count}></input>
			<input type="number" className="outline-none bg-transparent w-48 dark:text-gray-400 text-center font-extrabold top-[19rem] left-[7.5rem] absolute" placeholder="Objetive" onChange={(text) => {
			  if((text.target.value.length - 1) < 5) {
			    setObjetive(text.target.value)
					save(currentText, count, objetive, timer)
		    }
		  }} value={objetive}></input>

			<button className="bottom-0 w-1/2 h-1/4 bg-green-500 fixed" onClick={() => {
			  setCount(parseInt(count) + 1)
			  save(currentText, count, objetive, timer)
			}}>Add</button>
			<button className="right-0 bottom-0 w-1/2 h-1/4 bg-red-500 fixed" onClick={() => {
			  setCount(parseInt(count) - 1)
			  save(currentText, count, objetive, timer)
			}}>Remove</button>
		</main>
	)
}
