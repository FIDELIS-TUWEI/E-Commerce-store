import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

const SignUp = () => {
    //usestate
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("")

    // navigate home after sign up
    const navigate = useNavigate()

    // handleRegister form submit
    const handleRegister = (e) => {
        e.preventDefault()
        try{
        const user = createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user)
            navigate("/")
        } catch(error) {
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
                        onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setRegisterPassword(e.target.value)}
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
