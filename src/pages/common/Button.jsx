import Button from "@mui/material/Button";

const BasicButtons = ({title, handleAction}) => {
    return ( 
        <>
            <Button 
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }} 
                onClick={handleAction}
            >
                {title}
            </Button>
        </>
     );
}
 
export default BasicButtons;