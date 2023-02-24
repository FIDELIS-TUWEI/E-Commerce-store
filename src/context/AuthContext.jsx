import { useContext } from 'react

// react hook
const AuthContext = React.createContext()

// useAuth function
export const useAuth = () => {
  return useContext(AuthContext)
}

// authprovider
export const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  )
}
