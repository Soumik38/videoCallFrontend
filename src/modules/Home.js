import React, { useEffect, useRef, useState } from "react"
import {useLocation,useNavigate} from 'react-router-dom'
import axios from 'axios'

const Home = () => {
	const location=useLocation()
	const nav=useNavigate()
    const [joinId,setJoinId] = useState('')
	const [myId,setMyId]=useState('')
	setMyId(location.state.myEmail)

	async function joinRoom(e){
		e.preventDefault()
		try{
		  await axios.post('http://localhost:4000/room',{myId,joinId}).then(res=>{
			console.log(res.data)
			nav('/room',{state:{myId:myId,joinId:joinId}})
		  })
		}catch(e){
		  console.log(e)
		  alert('Error')
		}
	  }
	  
	async function createRoom(e){
		e.preventDefault()
		try{
		  await axios.post('http://localhost:4000/room',{myId}).then(res=>{
			console.log(res.data)
			nav('/room',{state:{myId:myId,joinId:joinId}})
		  })
		}catch(e){
		  console.log(e)
		  alert('Error')
		}
	  }

  return (
	// <div>{location.state.id}</div>
	<div className='flex justify-center items-center h-screen bg-yellow'>
		<div className='bg-red w-96 p-6 shadow-lg rounded-md'>
			<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
				<form action='POST' className='flex flex-col'>
		  			<button type="submit" 
		  			className='border-2 border-indigo-700 bg-blue text-white mt-3 py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold' 
		  			onClick={createRoom}>Create Room</button>
		  		</form>
				<form action='POST' className='flex flex-col'>
					<input 
					type='text' 
					name='joinRoom' 
					placeholder='Enter code' 
					onChange={(e)=>{setJoinId(e.target.value)}} 
					className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 mt-3'/>
            		<button type="submit"
					className='border-2 border-indigo-700 bg-blue text-white mt-3 py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold'
					onClick={joinRoom}>Join Room</button>
				</form>
        	</div>
      	</div>
  	</div>
  )
}

export default Home
