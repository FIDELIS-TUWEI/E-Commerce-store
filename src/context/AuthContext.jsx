import { useState, useEffect, createContext, useContext } from 'react'
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
  // useState
  const [user, setUser] = useState({})
  
  // createUser 
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  
  // useEffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser)
      setUser(currentUser)
    })
    return () => {
      unsubscribe();
    }
  });
  
  return (
    <UserContext.Provider value = {{createUser, user}}>
      {children}
    </UserContext.Provider>
  )
}

export const userAuth = () => {
  return useContext(userContext)
}
