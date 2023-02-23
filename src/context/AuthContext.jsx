import { createContext, useContext } from 'react'
import 
{
  createUserWithEmailAndPassword,
  SignInWithEmailAndPassword,
  SignOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../Firebase

// createContext hook
const userContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  
  return (
    <UserContext.Provider value = {{createUser}}>
      {children}
    </UserContext.Provider>
  )
}

export const userAuth = () => {
  return useContext(userContext)
}
