import { useEffect, useState } from 'react';
import './stylesheets/app.css';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Sign-up';

function App() {
  const [isAuth, setAuth] = useState();
  const [gameState, setGameState] = useState();
  const [signUp, setSignUp] = useState();

  useEffect(() => {
    const dataFetch = async () => {
      const res = await fetch('http://localhost:3000/api/home', {
        method: 'GET',
        credentials: 'include',
      });
      console.log(res);
    };

    dataFetch();
  }, []);

  return (
    <>
      {!signUp && <Login setSignUp={setSignUp} />}
      {signUp && <SignUp setSignUp={setSignUp} />}
    </>
  );
}

export default App;
