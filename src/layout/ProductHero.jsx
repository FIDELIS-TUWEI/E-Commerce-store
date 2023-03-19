import Typography from "@mui/material/Typography";
import HeroLayout from "./HeroLayout";
import landing from '../assets/landing.jpg'

// background image
const backgroundImage = {landing}

const ProductHero = () => {
    return ( 
    <HeroLayout
        sxBackground={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundColor: '#7fc7d9',
            backgroundPosition: 'center',
        }}
    >
        <img
            style={{ display: 'none' }}
            src={backgroundImage}
            alt=""
        />
        <Typography
            color="inherit"
            align="center"
            variant='h2'
            marked='center'
        >
            Welcome to Fleekyffect Store!
        </Typography>
    </HeroLayout> 
    );
}
 
export default ProductHero;