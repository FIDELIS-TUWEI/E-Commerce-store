import { userAuth } from '../context/AuthContext
import { useNavigate } from 'react-router-dom'

const Account = () => {
  // destructure user from userAuth
  const {user, logout} = userAuth();
  
  // useNavigate after logout
  const navigate = useNavigate();
  
  // handlelogout
  const handleLogout = async () => {
    try {
      await logout ();
      navigate("/");
      window.alert("Succesfully logged out");
    } catch (error) => {
      console.log(error.message);
    }
  }
  
  return (
    <div>
        <h1>Account</h1>
        <p>User Logged in: { user && user.email }</p>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Account;
