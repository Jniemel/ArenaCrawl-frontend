import PropTypes from 'prop-types';
import { useState } from 'react';
import { logIn } from '../utils/userManagement.js';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/auth.css';

Login.propTypes = {
  setSignUp: PropTypes.func,
};

export default function Login({ setSignUp }) {
  const [inputs, setInputs] = useState({ name: '', password: '' });
  const nav = useNavigate();

  async function handleLogIn(e) {
    e.preventDefault();
    const res = await logIn(inputs.name, inputs.password);
    if (res.user) {
      // refresh page
      return nav(0);
    }
  }

  return (
    <section className='login'>
      <h1>Login</h1>
      <form onSubmit={handleLogIn}>
        <div className='form-field'>
          <div>
            <label htmlFor='username'>Username:</label>
          </div>
          <input
            type='text'
            name='username'
            required
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
        </div>
        <div className='form-field'>
          <div>
            <label htmlFor='password'>Password:</label>
          </div>
          <input
            type='password'
            name='password'
            required
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>
        <button>Log in</button>
      </form>
      <button
        className='signup-login'
        onClick={() => {
          setSignUp(true);
        }}
      >
        Create an account.
      </button>
    </section>
  );
}
