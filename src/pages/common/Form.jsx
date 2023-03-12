import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Button from "./Button";

const Form = ({title, setEmail, setPassword, handleAction}) => {
    return ( 
        <Grid container component="main" sx={{ height: '100vh' }}>
                <h3>{title} Form</h3>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': {m: 1, width: '25ch'},                    
                }}
                noValidate
                autoComplete="off"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <TextField 
                    id="email"
                    label="Enter your Email"
                    variant="outlined"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Enter your Password"
                    variant="outlined"
                    type={"password"}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button title={title} handleAction={handleAction} />
            </Box>
        </Grid >
     );
}
 
export default Form;