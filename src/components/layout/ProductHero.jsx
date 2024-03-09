import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HeroLayout from "./HeroLayout";
import Link from '@mui/material/Link'

// background image
const backgroundImage = 'https://source.unsplash.com/random'

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
        <Typography 
            mb={4}
        >
            Enjoy affordable discounts on Items up to -30% off on products you purchase
        </Typography>
        <Button
            variant='contained'
            href='/Register'
        >
            Register
        </Button>
        <Typography mt={4}>
            Already have an account? <Link href='/login'>Login</Link>
        </Typography>
    </HeroLayout> 
    );
}
 
export default ProductHero;