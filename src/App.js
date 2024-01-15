import SignUp from './modules/SignUp/SignUp'
import SignIn from './modules/SignIn/SignIn'
import Home from './modules/Home/Home'
import Room from './modules/Room/Room'
import Profile from './modules/Profile/Profile'

import { BrowserRouter, Route , Routes } from 'react-router-dom'
import React, {Fragment} from 'react'
import './App.css'
import PrivateRoute from './util/PrivateRoute'

function App() {
  return (
  <>
      <BrowserRouter>
        <Fragment>
        <Routes>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/home' element={<PrivateRoute component={<Home/>}/>} />
          <Route path='/room/:roomNo' element={<PrivateRoute component={<Room/>}/>} />
          <Route path='/profile' element={<PrivateRoute component={<Profile/>}/>} />
        </Routes>
        </Fragment>
      </BrowserRouter>
    </>);
}

export default App;
