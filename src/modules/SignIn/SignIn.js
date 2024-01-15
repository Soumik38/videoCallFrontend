import React,{useEffect,useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import { useLocalState } from '../../util/useLocalStorage'
import './SignIn.css'

const SignIn = () => {
  const nav=useNavigate()
    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')
    
    async function submit(e){
        e.preventDefault()
        try{
          await axios.post('http://localhost:4000/signin',{email,pass}).then(res=>{
            console.log(res)
            if(res.data==='authorize'){
              localStorage.setItem('jwt', JSON.stringify('loggedin'))
              localStorage.setItem('myEmail', JSON.stringify(email))
              nav('/home')
              // nav('/home',{state:{myEmail:email}})
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
    <div className='container'>
      <div className='login-container'>
        <h1 className='text-4xl font-extrabold'>Welcome Back</h1>
        <form action='POST' className=''>
          <label for="email">Email Address</label>
          <input type='email' name='email' placeholder='Enter email' onChange={(e)=>{setEmail(e.target.value)}} className='email'/>
          <label for="password">Password</label>
          <input name='password' type='password' id='password' placeholder='Enter password' onChange={(e)=>{setPass(e.target.value)}}/>
          <button type='submit' onClick={submit} className='login-button'>Login</button>
        </form>
        <div className='mt-4'>
        <span className='text-indigo-800 font-semibold' onClick={()=>nav('/signup')}>Do not have an account ?</span>
        </div>
      </div>
    </div>
  )
}

export default SignIn