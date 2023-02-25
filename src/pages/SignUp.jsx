import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    // useState
    const [signUpEmail, setSignUpEmail] = useState("")
    const [signUpPassword, setSignUpPassword] = useState("")

    // handleRegister
    const handleRegister = (e) => {
        e.preventDefault()
    }

    
    return ( 
        <>
            <div className="signup__form">
                <form onSubmit={handleRegister}>
                    <label htmlFor="signup">Sign Up</label>
                    <input 
                        type="text"
                        placeholder="Enter Email"
                        required
                        onChange={(e) => setSignUpEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="text"
                        placeholder="Enter Password"
                        required
                        onChange={(e) => setSignUpPassword(e.target.value)}
                    />

                    <button type="submit">Sign Up</button>

                    <p>Already have an account? <Link to="login">Login</Link></p>
                </form>              
            </div>
        </>
     );
}
 
export default SignUp;