import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../utils/userManagement.js";
import "../stylesheets/login.css";

Login.propTypes = {
  setToken: PropTypes.func,
};

export default function Login({ setToken }) {
  const [inputs, setInputs] = useState({ name: "", password: "" });
  const nav = useNavigate();

  async function handleLogIn(e) {
    e.preventDefault();
    const res = await logIn(inputs.name, inputs.password);
    if (res.user) {
      // setToken(res.user);
      nav("/home");
    }
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
