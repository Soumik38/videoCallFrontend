import React,{useEffect,useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {
  const nav=useNavigate()
    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')
    async function submit(e){
        e.preventDefault()
        try{
          await axios.post('https://temp-back.onrender.com/signin',{email,pass}).then(res=>{
            console.log(res)
            if(res.data==='authorize'){
              nav('/home',{state:{myEmail:email}})
            }else if(res.data==='notexists'){
              alert('User does not exist.')
            }else if(res.data==='wrongpass'){
              alert('Wrong password')
            }
          })
        }catch(e){
          alert('Error')
        }
    }
  return (
    <div className='flex justify-center items-center h-screen bg-yellow'>
      <div className='bg-red w-96 p-6 shadow-lg rounded-md'>
        <h1 className='text-4xl font-extrabold'>Welcome Back</h1>
        <form action='POST' className='flex flex-col'>
          <input type='email' name='email' placeholder='Enter email' onChange={(e)=>{setEmail(e.target.value)}} className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 mt-3'/>
          <input name='password' type='password' placeholder='Enter password' onChange={(e)=>{setPass(e.target.value)}} className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 mt-3'/>
          <input type='submit' onClick={submit} className='border-2 border-indigo-700 bg-blue text-white mt-3 py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold'/>
        </form>
        <div className='mt-4'>
        <span className='text-indigo-800 font-semibold' onClick={()=>nav('/signup')}>Do not have an account ?</span>
        </div>
      </div>
    </div>
  )
}

export default SignIn