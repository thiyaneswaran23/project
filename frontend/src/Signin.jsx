import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css"; 

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/signin', { email, password })
            .then(result => {
                console.log(result);
                if (result.data.success) {
                    console.log("success");
                } else {
                    console.error("Authentication failed");
                }
            })
            .catch(err => console.error(err));

        console.log("Signin Attempt -> Email:", email, "Password:", password);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign In</button>
                </form>
                <p className="signup-text">
                    Don't have an account? 
                    <button className="signup-btn" onClick={() => navigate("/signup")}>
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Signin;
