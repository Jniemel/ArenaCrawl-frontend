import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    
    const [inputs, setInputs] = useState({ name: 'testUser', password: '123456' });
    
    async function handleSignUp(e) {
        e.preventDefault();        
        const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs })
            }
        )
        const json = await res.json();
        if (!res.ok) {
            console.log("Failed");
        }
        console.log(json);        
    }

    return (
        <>
            <h1>Sign-up!</h1>
            <form onSubmit={handleSignUp}>
                <div className="form-field">
                    <label htmlFor="new-username">Username</label>
                    <input type="text" name="new-username" />
                </div>
                <div className="form-field">
                    <label htmlFor="new-password">Password</label>
                    <input type="text" name="new-password" />
                </div>
                <button>Sign up</button>
            </form>
            <Link to="/login">Already have an account? Log in!</Link>
        </>
    );
}