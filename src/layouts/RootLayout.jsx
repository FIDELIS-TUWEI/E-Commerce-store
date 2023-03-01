import { useState, useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom'
import './rootlayout.css'
import {FaTimes, FaBars} from 'react-icons/fa'

const RootLayout = () => {
    //useState
    const [active, setActive] = useState("")

    //useRef
    const navRef = useRef()

    // showNavbar func
    const showNavBar = () => {
        navRef.current.classList.toggle("active__menu")
    }
    return ( 
        <>
            <div className="root__layout">
                <header>
                    <h3>Fleekyffect</h3>

                    <nav className='navbar' ref={navRef}>                     
                        <NavLink to='/' onClick={(e) => setActive} className={active ? "active" : ""}>Home</NavLink>
                        <NavLink to='login' onClick={(e) => setActive} className={active ? "active" : ""}>Login</NavLink>
                        <NavLink to='signup' onClick={(e) => setActive} className={active ? "active" : ""}>SignUp</NavLink>
                        <NavLink to='products' onClick={(e) => setActive} className={active ? "active" : ""}>Products</NavLink>
                        <NavLink to='account' onClick={(e) => setActive} className={active ? "active" : ""}>Account</NavLink>
                        <button className='nav-btn nav-close-btn' onClick={showNavBar}><FaTimes /></button>
                    </nav>
                    <button className='nav-btn' onClick={showNavBar}><FaBars /></button>
                </header>

                <main>
                    <Outlet />
                </main>
            </div>
            
        </>
     );
}
 
export default RootLayout;
