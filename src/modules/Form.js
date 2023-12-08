import Input from '../components/Input'
import React from 'react'

const Form = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='bg-red w-[400px] h-[500px] shadow-lg rounded-lg flex flex-col justify-center items-center'>
        <h1 className='text-4xl font-extrabold'>Welcome</h1>
        <form>
          <Input label='E-mail' type='email' name='email' placeholder='Enter your email'/>
          <Input label='Password' name='password' type='password' placeholder='Enter password'/>
        </form>
      </div>
    </div>
  )
}

export default Form