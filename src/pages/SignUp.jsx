import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

const SignUp = () => {
    //usestate
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    
    const {createUser} = useAuth()

    // navigate home after sign up
    const navigate = useNavigate()

    // handleRegister form submit
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("")
        
        try {
            await createUserWithEmailAndPassword(email, password);
            console.log(user)
            navigate("/")
        } catch(error) {
            setError(error.message)
            console.log(error.message)
        }
    }
    return ( 
        <>
            <div className="signup">
                <form onSubmit={handleRegister} className="signup__form">
                    <label htmlFor="signup">Sign Up</label>
                    <input 
                        type="text"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Sign Up</button>
                    <br />
                    <p>Already have an account? <Link to="login">Login</Link></p>
                </form>
            </div>
        </>
     );
}
 
export default SignUp;
