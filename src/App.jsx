import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './stylesheets/app.css';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Sign-up';

function App() {
  const [gameState, setGameState] = useState();
  const [signUp, setSignUp] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const dataFetch = async () => {
      const res = await fetch('http://localhost:3000/api/home', {
        method: 'GET',
        credentials: 'include',
      });
      let json = null;
      if (res.ok) {
        json = await res.json();
      }
      setGameState(json);
      setLoading(false);
    };
    dataFetch();
  }, []);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route
          path='/home'
          element={
            !gameState ? (
              <Navigate to='/auth' />
            ) : (
              <Home gameState={gameState} />
            )
          }
        />
        <Route
          path='/auth'
          element={
            gameState ? (
              <Navigate to='/home' />
            ) : signUp ? (
              <SignUp setSignUp={setSignUp} />
            ) : (
              <Login setSignUp={setSignUp} />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
