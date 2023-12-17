import React,{useEffect,useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const nav=useNavigate()
  const [email,setEmail]=useState('')
  const [pass,setPass]=useState('')
  const [name,setName]=useState('')
  const headers = {
    "Content-Type": "application/json"
  };
  // const [confpass,setConfpass]=useState('')
  async function submit(e){
    e.preventDefault()
    try{
      await axios.post('http://localhost:4000/signup',{email,pass,name}).then(res=>{
        console.log(res.data)
        if(res.data==='exists'){
          alert('User already exists.')   
        }else if(res.data==='notexists'){
          nav('/home',{state:{id:email}})
        }
      })
    }catch(e){
      console.log(e)
      alert('Error')
    }
  }
  return (
    <div className='flex justify-center items-center h-screen bg-yellow'>
      <div className='bg-red w-96 p-6 shadow-lg rounded-md'>
        <h1 className='text-4xl font-extrabold'>Welcome</h1>
        <form action='POST' className='flex flex-col'>
          <input type='text' name='Name' placeholder='Enter name' onChange={(e)=>{setName(e.target.value)}} className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 mt-3'/>
          <input type='email' name='email' placeholder='Enter email' onChange={(e)=>{setEmail(e.target.value)}} className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 mt-3'/>
          <input name='password' type='password' placeholder='Set password' onChange={(e)=>{setPass(e.target.value)}} className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 mt-3'/>
          {/* <input label='ConfirmPassword' name='confirmPassword' type='password' placeholder='Confirm password'/> */}
          <input label='Sign Up' type='submit' onClick={submit} className='border-2 border-indigo-700 bg-blue text-white mt-3 py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold'/>
        </form>
        <div className='mt-4'>
        <span className='text-indigo-800 mt-3 font-semibold' onClick={()=>nav('/signin')}>Already have an account ?</span>
        </div>
      </div>
    </div>
  )
}

export default SignUp