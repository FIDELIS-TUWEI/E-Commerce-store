import { NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
    return ( 
        <div>
            <header>
<<<<<<< HEAD
                <h3>FLEEKYFFECT</h3>
                <nav>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                </nav>
            </header>

=======
                <nav>
                    <NavLink to="login">Login</NavLink>
                    <NavLink to="register">Register</NavLink>
                </nav>
            </header>
>>>>>>> routes
            <main>
                <Outlet />
            </main>
        </div>
     );
}
 
export default RootLayout;