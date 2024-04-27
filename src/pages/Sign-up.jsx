import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../utils/userManagement.js";
import "../stylesheets/login.css";

export default function Login() {
  const [inputs, setInputs] = useState({
    name: "testUser",
    password: "123456",
  });

  async function handleSignUp(e) {
    e.preventDefault();
    signUp(inputs.name, inputs.password);
  }

  return (
    <section className="sign-up">
      <h1>Sign-up!</h1>
      <form onSubmit={handleSignUp}>
        <div className="form-field">
          <label htmlFor="new-username">Username:</label>
          <input
            type="text"
            name="new-username"
            required
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label htmlFor="new-password">Password:</label>
          <input
            type="password"
            name="new-password"
            required
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>
        <button>Sign up</button>
      </form>
      <nav>
        <Link to="/login">Already have an account? Log in!</Link>
      </nav>
    </section>
  );
}
