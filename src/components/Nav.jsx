import './nav.css'
import {BiHome} from 'react-icons/bi'
import {BiLogIn} from 'react-icons/bi'
import {AiOutlineSetting} from 'react-icons/ai'

const Nav = () => {
    return ( 
        <nav className="navbar">
            <h4>Fleekyffect Firestore</h4>

            <ul className='navmenu'>
                <li><a href="#"><BiHome /></a></li>
                <li><a href="#"><BiLogIn /></a></li>
                <li><a href="#form"><AiOutlineSetting /></a></li>
            </ul>
        </nav>
     );
}
 
export default Nav;