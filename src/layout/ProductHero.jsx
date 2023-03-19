import Typography from "@mui/material/Typography";
import HeroLayout from "./HeroLayout";

// background image
const backgroundImage = 'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400';

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
    </HeroLayout> 
    );
}
 
export default ProductHero;