import { useContext, useState } from 'react

// react hook
const AuthContext = React.createContext()

// useAuth function
export const useAuth = () => {
  return useContext(AuthContext)
}

// authprovider
export const AuthProvider = ({children}) => {
  // useState
  const [user, setUser] = useState();
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
