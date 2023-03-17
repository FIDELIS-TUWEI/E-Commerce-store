import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import { NavLink, Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ImageList } from "@mui/material";
import landing from '../assets/landing'

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

                    <Container maxWidth="lg">
                        <ImageList>
                            <img src={} alt="" />
                        </ImageList>
                    </Container>
                </ThemeProvider>
            </section>
        </div>
     );
}
 
export default RootLayout;