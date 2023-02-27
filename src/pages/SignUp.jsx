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
            window.alert("Succesful Sign Up")
            navigate("/products")
          }).catch((error) => {
             window.alert("Invalid email or password")
        })
    }

    
    return ( 
        <>
            <div className="signup__form">
                <form onSubmit={handleRegister}>
                    <h3>Create New Account</h3>
                    <label htmlFor="signup">Sign Up</label>
                    <input 
                        type="text"
                        placeholder="Enter Email"
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

                    <button type="submit">Sign Up</button>

                    <h5>Already have an account? <Link to="/login">Login</Link></h5>
                </form>              
            </div>
        </>
    );
}
 
export default SignUp;
