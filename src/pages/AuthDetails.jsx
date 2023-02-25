import {useState, useEffect, useNavigate } from 'react'
import { auth } from '../Firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const AuthDetails = () => {
  //useState
  const [authUser, setAuthUser] = usestate(null)
  
  //useNavigate
  const navigate = useNavigate()
  
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
  
})

export default AuthDetails;
