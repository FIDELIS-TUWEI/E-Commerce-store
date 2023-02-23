import { useNavigate } from 'react-router-dom'
import { userAuth } from '../context/AuthContext'

const ProtectedRoute = ({children}) => {
  const { user } = userAuth();
  
  if(!user) {
    return <Navigate to="/" />
  }
  return children;
  
}
  
export default ProtectedRoute;
