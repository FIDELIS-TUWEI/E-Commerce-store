import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    // useState
    const [signUpPassword, setSignUpPassword] = useState("")
    const [signUpEmail, setSignUpEmail] = useState("")
    
    return ( 
        <>
            <div className="signup__form">
                <label htmlFor="signup">Sign Up</label>
                <input 
                    type="text"
                    placeholder="Enter Email"
                    required
                    onChange={(e) => setSignUpPassword(e.target.value)}
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
            </div>
        </>
     );
}
 
export default SignUp;