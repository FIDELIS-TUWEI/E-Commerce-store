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
        navigate("/")
        window.alert("Succesful Sign Out! Thank you for choosing Fleekyffect")
      }).catch((error) => {
        console.log(error.message)
      })
  }
    
  return (
    <div className='account__container'>
      { authUser ? <> <p className='account'>{`Signed in as:  ${authUser.email}`}</p> 
        <button onClick={userSignOut} className='signout__btn'>Sign Out</button> </> : <p>Signed Out</p> }
    </div>
  )
  
}

export default Account;
