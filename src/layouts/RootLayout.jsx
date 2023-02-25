import { NavLink, Outlet } from 'react-router-dom'
import './rootlayout.css'

const RootLayout = () => {
    return ( 
        <>
            <div className="root__layout">
                <header>
                    <h3>Fleekyffect</h3>

                    <nav>                     
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='login'>Login</NavLink>
                        <NavLink to='signup'>Sign Up</NavLink>
                        <NavLink to='products'>Products</NavLink>
                        <NavLink to='authdetails'>AuthDetails</NavLink>
                    </nav>
                </header>

                <main>
                    <Outlet />
                </main>
            </div>
            
        </>
     );
}
 
export default RootLayout;
