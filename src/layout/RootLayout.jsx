import { NavLink, Outlet } from "react-router-dom";
import HeroLayout from "./HeroLayout";

const RootLayout = () => {
    return ( 
        <div>
            <header>
                <nav>
                    <NavLink to="login">Login</NavLink>
                    <NavLink to="register">Register</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <HeroLayout/>
        </div>
     );
}
 
export default RootLayout;