
import PhoneAuthentication from './pages/Login/PhoneAuthentication.js';
// etar mane hocce je page e dukte cai setar access
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import UserCheck from './pages/Login/UserCheck';
import Registration from './pages/Registration/Registration.jsx';
import Login from './pages/Login/Login.jsx';
import Practice from './Practice/Practice.jsx';
import './App.css'

import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import { useState } from 'react';






function App() {

  let [darkMode, setDarkMode] = useState(true)

  let handleDarkLIghtMode = () => {
    setDarkMode(!darkMode) //etar mane holo ekbar true arekbar false
  }

  return (
    <div className={darkMode?"AppLight" : "AppDark"}>


      <div className='dlMode' onClick={handleDarkLIghtMode}>
        {
          darkMode ? <small className='off'><BsToggleOff></BsToggleOff></small>

            : <small className='on'><BsToggleOn></BsToggleOn></small>
        }


      </div>

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Registration></Registration>}> </Route>
          <Route path="/login" element={<Login></Login>}> </Route>
          <Route path="/home" element={<Home />}> </Route>
          <Route path="/ucheck" element={<UserCheck />}> </Route>
          <Route path="/phone" element={<PhoneAuthentication />}> </Route>

        </Routes>

      </BrowserRouter>
    </div>
  );
  
}



export default App;
