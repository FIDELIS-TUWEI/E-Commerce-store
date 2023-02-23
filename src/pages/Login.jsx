import { async } from "@firebase/util";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

const Login = () => {

    // useState
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    // navigate to products after login
    const navigate = useNavigate();

    // handleLogin
    const handleLogin = (e) => {
        e.preventDefault();

        try {
            const user = signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user)
            navigate("/")
        } catch(error) {
            console.log(error.message)
        }
    }

    return ( 
        <>
            <div>
                <form onSubmit={handleLogin} className="login__form">
                    <label htmlFor="login">Login</label>
                    <input 
                        type="text" 
                        placeholder="Enter your email" 
                        required
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter valid password" 
                        required
                        onChange={(e) => setLoginPassword(e.target.value)} 
                    />

                    <button type="submit">Login</button>
                    <br />
                    <p>Don't have an account yet? <Link to="signup">Sign Up</Link> now!</p>

                </form>
            </div>
        </>
     );
}
 
export default Login;
