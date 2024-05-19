import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './stylesheets/app.css';

// pages
import Menu from './pages/Menu';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Sign-up';

function App() {
  const [signUp, setSignUp] = useState();
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [loadGame, setLoadGame] = useState(false);

  useEffect(() => {
    const authUser = async () => {
      const res = await fetch('http://localhost:3000/api/menu', {
        method: 'GET',
        credentials: 'include',
      });
      let json = null;
      if (res.status === 200) {
        json = await res.json();
        setUser(json.username);
      }
      setLoading(false);
    };
    authUser();
  }, []);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/menu' />} />
        <Route
          path='/menu'
          element={
            !user ? (
              <Navigate to='/auth' />
            ) : loadGame ? (
              <Navigate to='/home' />
            ) : (
              <Menu user={user} setLoadGame={setLoadGame} />
            )
          }
        />
        <Route
          path='/home'
          element={user && loadGame ? <Home /> : <Navigate to='/menu' />}
        />
        <Route
          path='/auth'
          element={
            user ? (
              <Navigate to='/menu' />
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
