import { NavLink, Outlet } from 'react-router-dom'

const RootLayout = () => {
    return ( 
        <>
            <div className="root__layout">
                <header>
                    <nav>
                        <h1>Fleekyffect</h1>
                        
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='login'>Login</NavLink>
                        <NavLink to='signup'>Sign Up</NavLink>
                        <NavLink to='products'>Products</NavLink>
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