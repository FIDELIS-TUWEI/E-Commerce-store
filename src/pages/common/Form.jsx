import { Box } from "@mui/material/Box";
import { TextField } from "@mui/material/TextField";
import { Button } from "@mui/material/Button";

const BasicForm = () => {
    return ( 
        <>
            <div className="heading__container">
                <h3>Login Form</h3>
            </div>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
            >
                <TextField 
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                />
            </Box>
        </>
     );
}
 
export default BasicForm;