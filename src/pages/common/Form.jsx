import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


import Button from "./Button";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

// copyright
const Copyright = (props) => {
    return (
        <Typography variant='body2' color='text.secondary' align='center' {...props}>
            {'Copyright © '}
            Fleekyffect - {new Date().getFullYear()} 
        </Typography>
    )
}

// ThemeProvider
const theme = createTheme();

const Form = ({title, setEmail, setPassword, handleAction}) => {
    

    return ( 
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '90vh' }}>
                <CssBaseline />

                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => 
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary-main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography>
                            {title} Page
                        </Typography>

                        <Box
                            component="form"
                            sx={{ mt: 1 }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                margin='normal'
                                fullWidth
                                id="email"
                                label="Enter your Email"
                                variant="outlined"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id="password"
                                label="Enter your Password"
                                variant="outlined"
                                type={"password"}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button title={title} handleAction={handleAction} />

                            <Grid container>
                                <Grid item>
                                    Go back <Link href='/'>Home</Link>
                                </Grid>
                            </Grid>

                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid >
        </ThemeProvider>
     );
}
 
export default Form;