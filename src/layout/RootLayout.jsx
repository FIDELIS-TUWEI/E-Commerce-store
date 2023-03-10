import { NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
    return ( 
        <div>
            <header>
                <h3>FLEEKYFFECT</h3>
                <nav>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
     );
}
 
export default RootLayout;