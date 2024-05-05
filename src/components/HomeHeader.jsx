import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

HomeHeader.propTypes = {
  user: PropTypes.string,
};

export default function HomeHeader({ user }) {
  const nav = useNavigate();

  async function handleLogOut() {
    await fetch('http://localhost:3000/api/auth/logout', {
      method: 'GET',
      credentials: 'include',
    });
    // refresh page
    return nav(0);
  }

  return (
    <header>
      <div>
        <div className='header-greeting'>
          <h1>Welcome, {user}</h1>
        </div>
        <div className='header-buttons'>
          <button onClick={handleLogOut}>Logout</button>
        </div>
      </div>
    </header>
  );
}
