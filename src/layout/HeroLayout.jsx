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

// Background
const Background = styled(Box)({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
});

// HeroLayout
const HeroLayout = () => {
    return ( 
        <></>
     );
}
 
export default HeroLayout;