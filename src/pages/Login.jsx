import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

const Login = () => {

    // useState
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
        const log = signInWithEmailAndPassword(auth, email, password)
            .the((log) => {
                navigate("/products")
            })
            .catch((error) => {
                console.log(error.message)
            })

    }

    return ( 
        <>
            <div>
                <form onSubmit={handleLogin}>
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
                    <h4>User logged in:</h4>
                    {user.email}

                    <button type="submit">Logout</button>
                </form>
            </div>
        </>
     );
}
 
export default Login;