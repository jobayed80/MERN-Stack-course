
import PhoneAuthentication from './pages/Login/PhoneAuthentication.js';
// etar mane hocce je page e dukte cai setar access
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import UserCheck from './pages/Login/UserCheck';
import Registration from './pages/Registration/Registration.jsx';
import Login from './pages/Login/Login.jsx';
import Practice from './Practice/Practice.jsx';






function App() {
  return (
    <div className="App">
      {/* <Practice></Practice> */}
      {/* <Login></Login> */}
      {/* <PhoneAuthentication></PhoneAuthentication> */}
      {/* <Raiyan></Raiyan> */}
      {/* <Login></Login> */}
  
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Registration></Registration>}> </Route>
          <Route path="/login" element={<Login></Login>}> </Route>
          <Route path="/home" element={<Home/>}> </Route>
          <Route path="/ucheck" element={<UserCheck/>}> </Route>
          <Route path="/phone" element={<PhoneAuthentication/>}> </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
