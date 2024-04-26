import { useState } from "react";
import { Link } from "react-router-dom";
import '../stylesheets/login.css';

export default function Login() {

    return (
        <section className="login">
            <h1>Login</h1> 
            <form>                          
                <div className="form-field">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" />
                </div>
                <div className="form-field">
                    <label htmlFor="password">Password:</label>
                    <input type="text" name="password" />
                </div>
                <button>Log in</button>                
            </form>
            <nav>
                <Link to="/sign-up">Create an account.</Link>
            </nav>
        </section>
    );
}
