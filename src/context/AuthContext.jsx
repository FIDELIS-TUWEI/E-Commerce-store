import { useContext, useState, useEffect } from 'react'
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

  // useEffect onAuthStateChanged to set currentuser
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signUp
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
