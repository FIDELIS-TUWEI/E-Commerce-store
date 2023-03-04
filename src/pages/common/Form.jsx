import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Button from "./Button";

const Form = ({title, setEmail, setPassword, handleAction}) => {
    return ( 
        <>
            <div className="heading__container">
                <h3>{title} Form</h3>
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
                    id="email"
                    label="Enter your Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Enter your Password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Button title={title} handleAction={handleAction} />
        </>
     );
}
 
export default Form;