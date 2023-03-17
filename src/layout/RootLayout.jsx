import CssBaseline from "@mui/material/CssBaseline";

import { NavLink, Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const RootLayout = () => {
    const theme = createTheme();
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

            <section>
                <ThemeProvider theme={theme}>
                    <CssBaseline />

                </ThemeProvider>
            </section>
        </div>
     );
}
 
export default RootLayout;