import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logIn } from "../utils/userManagement.js";
import "../stylesheets/login.css";

export default function Login({ setToken }) {
  const [inputs, setInputs] = useState({ name: "", password: "" });

  function handleLogIn(e) {
    e.preventDefault();
    logIn(inputs.name, inputs.password);
  }

  return (
    <section className="login">
      <h1>Login</h1>
      <form onSubmit={handleLogIn}>
        <div className="form-field">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            required
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>
        <button>Log in</button>
      </form>
      <nav>
        <Link to="/sign-up">Create an account.</Link>
      </nav>
    </section>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
