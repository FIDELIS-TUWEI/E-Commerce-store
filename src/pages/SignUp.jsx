import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
    // useState
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    // useNavigate
    const navigate = useNavigate()

    // handleRegister
    const handleRegister = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredentials) => {
            console.log(userCredentials)
            navigate("/")
        }).catch((error) => {
            console.log(error.message)
        })
    }

    
    return ( 
        <>
            <div className="signup__form">
                <form onSubmit={handleRegister}>
                    <h1>Create New Account</h1>
                    <label htmlFor="signup">Sign Up</label>
                    <input 
                        type="text"
                        placeholder="Enter Email"
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

                    <button type="submit">Sign Up</button>

                    <p>Already have an account? <Link to="login">Login</Link></p>
                </form>              
            </div>
        </>
     );
}
 
export default SignUp;
