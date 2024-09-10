// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './css/App.css';
import Login from './components/Pages/Home/Login';
import System from './components/Pages/Spaces/Planet/System.jsx';
import Instructions from './components/Pages/Instructions/Instructions.jsx';
import Orbit from './components/Pages/Spaces/Orbit/Orbit.jsx';
import Lamp from './components/Pages/Spaces/Lamp/Lamp.jsx';
import SignUp from './components/Pages/Home/SignUp.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuth, setIsAuth]=useState(false);

  // Function to perform login
  const onLogin = () => {
    setIsLoggedIn(true);
  };

  
  // Function to perform logout

  return (
    <BrowserRouter>
      <Routes>
         {/* <Route
          path="/spaces"
          element={isLoggedIn ? <Spaces status={isLoggedIn} /> : <Navigate to="/" />}
        /> */}
        <Route
          path="/instructions"
          element={<Instructions isLoggedIn={isLoggedIn}/>}
        />
        <Route path='/planet' element={<System/>}/>
        <Route path="/orbit" element={<Orbit/>}/>
        <Route path="/lamp" element={<Lamp/>}></Route>
        <Route path='/' element={<Login onLogin={onLogin} />}></Route>
        <Route path='/sign-up' element={<SignUp/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// to do:
// save notes and to do lists in database
//profile to show last logged in 
// notes app
// link to python utlities