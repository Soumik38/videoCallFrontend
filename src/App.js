import SignUp from './modules/SignUp'
import SignIn from './modules/SignIn'
import Home from './modules/Home'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import './App.css';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
