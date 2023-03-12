import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import Form from './pages/common/Form';
import Products from './pages/Products'
import { ThemeProvider } from '@mui/material';
import {theme} from './theme';
import { useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RootLayout from './layout/RootLayout';

const App = () => {

  
  // useState
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //useNavigate

  //handleAction fucntion
  const handleAction =(id) => {
    const authentication = getAuth()
    // createuser with condition to trigger functionality based on unique id
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          //sessionstorage
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        }).catch((error) => {
          // condition for email-already-registered
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email already in use')
          }
        })
    }

    // login user with email & password
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          //sessionstorage
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        }).catch((error) => {
          // condition for wrong-password
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check the Password')
          }
          // condition for user not found
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email')
          }
        })
    }
  }

  // useEffect for authtoken check
  useEffect(() => {
    let authtoken = sessionStorage.getItem('Auth Token')
    // authtoken check
    if (authtoken) {
    }
  }, []);

  return ( 
      <div className="App">
        <ThemeProvider theme={theme}>
          <ToastContainer />
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
