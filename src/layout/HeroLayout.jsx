import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Container, Box } from "@mui/material";

// HeroLayoutRoot
const HeroLayoutRoot = styled('section')(({ theme }) => ({
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        height: '80vh',
        minHeight: 500,
        maxHeight: 1300,
    }
}));

const HeroLayout = () => {
    return ( 
        <></>
     );
}
 
export default HeroLayout;