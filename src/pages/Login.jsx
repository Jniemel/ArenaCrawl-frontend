import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ testUserChange }) {



    return (
        <>
            <h1>Hello from login-page!</h1>            
            <form>
                <div className="form-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" />
                </div>
                <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" />
                </div>
                <button>Sign up</button>
            </form> 
            <button onClick={testUserChange}>login-test</button> 
            <Link to="/sign-up">Create an account.</Link>
        </>
    );
}
