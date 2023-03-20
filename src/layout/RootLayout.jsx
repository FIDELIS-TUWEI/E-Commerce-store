import { NavLink, Outlet } from "react-router-dom";
import ProductHero from "./ProductHero";

const RootLayout = () => {
    return ( 
        <div>
            <ProductHero/>
        </div>
     );
}
 
export default RootLayout;