import { async } from "@firebase/util";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { UserAuth } from '../context/AuthContext'

const Login = () => {

    // useState
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const {login} = UserAuth()

    // navigate to products after login
    const navigate = useNavigate();

    // handleLogin
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.alert("Succesful Login")
            navigate("account")
        } catch(error) {
            setError(error.message)
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
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter valid password" 
                        required
                        onChange={(e) => setPassword(e.target.value)} 
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
