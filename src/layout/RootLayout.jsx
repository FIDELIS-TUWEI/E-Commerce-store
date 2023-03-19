import { NavLink, Outlet } from "react-router-dom";
import ProductHero from "./ProductHero";

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
            <ProductHero/>
        </div>
     );
}
 
export default RootLayout;