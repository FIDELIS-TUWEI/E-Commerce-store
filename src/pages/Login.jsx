import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    // useState
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    // handleLogin
    const handleLogin = (e) => {
        e.preventDefault();
    }

    return ( 
        <>
            <div className="signup__form">
                <form onSubmit={handleLogin}>
                    <label htmlFor="login">Login</label>
                    <input 
                        type="text"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="text"
                        placeholder="Enter Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>
                    <p>Don't have an account? <Link to="signup">Sign Up</Link></p>
                </form>
            </div>
        </>
     );
}
 
export default Login;
