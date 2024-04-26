import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './stylesheets/app.css';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Sign-up';

function App() {
  const [user, setUser] = useState(0);

  function testUserChange() {
    const bool = user ? false : true;
    setUser(bool);
  }

  return (
    <>    
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              user ? <Navigate to="/home" /> : <Navigate to="login" />
            }          
          />
          <Route
            path='/home'
            element={
              user ? <Home testUserChange={testUserChange} /> : <Navigate to="/" />
            }          
          />
          <Route
            path='/login'
            element={
              user ? <Navigate to="/home" /> : <Login testUserChange={testUserChange}/>
            }          
          />
          <Route
            path='/sign-up'
            element={
              user ? <Navigate to="/home" /> : <SignUp />
            }          
          />            
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
