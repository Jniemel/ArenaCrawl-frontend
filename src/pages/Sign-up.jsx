import PropTypes from 'prop-types';
import { useState } from 'react';
import { signUp } from '../utils/userManagement.js';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/auth.css';

SignUp.propTypes = {
  setSignUp: PropTypes.func,
};

export default function SignUp({ setSignUp }) {
  const [inputs, setInputs] = useState({
    name: '',
    password: '',
  });
  const nav = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    const res = await signUp(inputs.name, inputs.password);
    if (res.user) {
      // refresh page
      return nav(0);
    }
  }

  return (
    <section className='sign-up'>
      <h1>Sign-up!</h1>
      <form onSubmit={handleSignUp}>
        <div className='form-field'>
          <div>
            <label htmlFor='new-username'>Username:</label>
          </div>
          <input
            type='text'
            name='new-username'
            required
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
        </div>
        <div className='form-field'>
          <div>
            <label htmlFor='new-password'>Password:</label>
          </div>
          <input
            type='password'
            name='new-password'
            required
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>
        <button>Sign up</button>
      </form>
      <button
        className='signup-login'
        onClick={() => {
          setSignUp(false);
        }}
      >
        Have an account? Log in!
      </button>
    </section>
  );
}
