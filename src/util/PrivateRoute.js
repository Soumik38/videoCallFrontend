import React from 'react'
import {Navigate} from 'react-router-dom'
import { useLocalState } from './useLocalStorage';

const PrivateRoute = ({component}) => {
    const [jwt,setJwt] = useLocalState('loggedin','jwt')

  return jwt ? component : <Navigate to='/signin'/>
}

export default PrivateRoute
