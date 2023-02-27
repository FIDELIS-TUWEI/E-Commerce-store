import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

const Login = () => {
    // useState
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // useNavigate hook
    const navigate = useNavigate()
    
    // handleLogin
    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                navigate("/products")
                window.alert("Welcome to Fleekyffect")
            }).catch((error) => {
                window.alert("Invalid email or password")
            })
    }

    return ( 
        <>
            <div className="signup__form">
                <form onSubmit={handleLogin}>
                    <h3>Login to your account</h3>
                    <label htmlFor="login">Login</label>
                    <input 
                        type="text"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        placeholder="Enter Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>
                    <h5>Don't have an account? <Link to="/signup">Sign Up</Link></h5>
                </form>
            </div>
        </>
     );
}
 
export default Login;
