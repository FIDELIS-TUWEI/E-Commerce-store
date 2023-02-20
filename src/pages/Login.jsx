import { async } from "@firebase/util";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

const Login = () => {

    // useState
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    // navigate to products after login
    const navigate = useNavigate();

    // onAuthStateChanged
    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

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

    // handle logout
    const handleLogout = async () => {
        await signOut(auth);
    }

    return ( 
        <>
            <div>
                <h4>User logged in:</h4>
                {user?.email}
                <form onSubmit={handleLogin}>
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

                    <button onClick={handleLogout}>Logout</button>
                </form>
            </div>
        </>
     );
}
 
export default Login;