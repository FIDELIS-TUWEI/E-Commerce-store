import { useContext, useState } from 'react'
import { auth } from '../Firebase'

// react hook
const AuthContext = React.createContext()

// useAuth function
export const useAuth = () => {
  return useContext(AuthContext)
}

// authprovider
export const AuthProvider = ({children}) => {
  // useState
  const [currentUser, setCurrentUser] = useState();

  // create user
  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  // 

  const value = {
    currentUser
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
