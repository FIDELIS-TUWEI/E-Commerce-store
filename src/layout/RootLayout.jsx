import { NavLink, Outlet } from "react-router-dom";
import ProductHero from "./ProductHero";

const RootLayout = () => {
    return ( 
        <div>
            <main>
                <Outlet />
            </main>
            <ProductHero/>
        </div>
     );
}
 
export default RootLayout;