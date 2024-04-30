import { useNavigate } from 'react-router-dom';
import '../stylesheets/home.css';

export default function Home() {
  const nav = useNavigate();

  async function handleLogOut() {
    await fetch('http://localhost:3000/api/auth/logout', {
      method: 'GET',
      credentials: 'include',
    });
    return nav(0);
  }

  return (
    <header>
      <h1>Hello from home-page!</h1>
      <button onClick={handleLogOut}>Logout</button>
    </header>
  );
}
