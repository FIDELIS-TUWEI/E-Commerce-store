import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom'
import './rootlayout.css'

const RootLayout = () => {
    const [active, setActive] = useState("")
    return ( 
        <>
            <div className="root__layout">
                <header>
                    <h3>Fleekyffect</h3>

                    <nav className='navbar'>                     
                        <NavLink to='/' onClick={(e) => setActive} className={active ? "active" : ""}>Home</NavLink>
                        <NavLink to='login' onClick={(e) => setActive} className={active ? "active" : ""}>Login</NavLink>
                        <NavLink to='signup' onClick={(e) => setActive} className={active ? "active" : ""}>SignUp</NavLink>
                        <NavLink to='products' onClick={(e) => setActive} className={active ? "active" : ""}>Products</NavLink>
                        <NavLink to='account' onClick={(e) => setActive} className={active ? "active" : ""}>Account</NavLink>

                        
                    </nav>
                    <div className="hambuger__menu">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </header>

                <main>
                    <Outlet />
                </main>
            </div>
            
        </>
     );
}
 
export default RootLayout;
