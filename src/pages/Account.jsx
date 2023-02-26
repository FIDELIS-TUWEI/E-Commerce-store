import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../Firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const Account = () => {
  //useState
  const [authUser, setAuthUser] = useState(null)
  
  //useNavigate
  const navigate = useNavigate();
  
  //useEffect
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      // check if signed in
      user ? setAuthUser(user) : setAuthUser(null)
    })
    
    return () => {
      listen()
    }
  }, [])
  
  //signout
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Successful Sign Out")
        navigate("/")
      }).catch((error) => {
        console.log(error.message)
      })
  }
    
  return (
    <>
      { authUser ? <> <p>{`Signed in as ${authUser.email}`}</p> <button onClick={userSignOut}>Sign Out</button> </> : <p>Signed Out</p> }
    </>
  )
  
}

export default Account;
