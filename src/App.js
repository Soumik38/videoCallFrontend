import SignUp from './modules/SignUp/SignUp'
import SignIn from './modules/SignIn/SignIn'
import Home from './modules/Home/Home'
import Room from './modules/Room/Room'


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
          <Route element={<PrivateRoute/>}>
            <Route path='/home' element={<Home/>}/>
            <Route path='/room/:roomNo' element={<Room/>}/>
          </Route>
        </Routes>
        </Fragment>
      </BrowserRouter>
    </>);
}

export default App;
