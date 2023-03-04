import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import Form from './pages/common/Form';
import Products from './pages/Products'
import { ThemeProvider } from '@mui/material';
import {theme} from './theme';
import { useEffect, useState } from 'react';
import app, { auth } from './Firebase'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

const App = () => {
  // useState
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //useNavigate
  const navigate = useNavigate()

  //handleAction fucntion
  const handleAction =(id) => {
    const authentication = getAuth()
    // createuser with condition to trigger functionality based on unique id
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/products')
          //sessionstorage
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
    }

    // login user with email & password
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/products')
          //sessionstorage
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
    }
  }

  // useEffect for authtoken check
  useEffect(() => {
    let authtoken = sessionStorage.getItem('Auth Token')
    // authtoken check
    if (authtoken) {
      navigate('/products')
    }
  }, []);

  return ( 
      <div className="App">
        <ThemeProvider theme={theme}>
          <Routes>
            <Route 
              path='/login' 
              element={
                <Form 
                  title="Login"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction(1)}
              />} 
            />
            <Route 
              path='/register' 
              element={
                <Form 
                  title="Register"
                  setEmail={setEmail}
                  setPassword={setPassword}
                  handleAction={() => handleAction(2)}
              />} 
            />
            <Route 
              path='/products' 
              element={
                <Products 
              />} 
            />
          </Routes>
        </ThemeProvider>
      </div>
   );
}
 
export default App;
