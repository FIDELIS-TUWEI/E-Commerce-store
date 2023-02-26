import { Link } from 'react-router-dom'
import landing from '../assets/landing.jpeg'

const Home = () => {
    return ( 
        <>
            <div className="home__section">
                <h2>Welcome to Fleekyffect</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, voluptate impedit placeat, adipisci hic atque dignissimos nostrum quam ad, officia aut deserunt. Placeat nesciunt esse consequuntur, odit repellendus explicabo corporis.</p>
                <Link to="signup">Get Started</Link>
                <Link to="login">Login</Link>

                <div className="landing__image">
                    <img src={landing} alt="" />
                </div>

            </div>
            
            <footer>
                <p>&copy; All rights reserved. Fleekyffect-2023</p>
            </footer>
        </>
     );
}
 
export default Home;
