import SignUp from './modules/SignUp'
import SignIn from './modules/SignIn'
import Home from './modules/Home'
import Room from './modules/Room';
import Profile from './modules/Profile';

import { BrowserRouter, Route , Routes } from 'react-router-dom'

import './App.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/room/:roomNo' element={<Room/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
