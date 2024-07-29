import './HamMenu.css';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const HamMenu = ({ open }) => {

    HamMenu.propTypes = {
        open: PropTypes.bool.isRequired
    };

    return (
        <nav className={`menu ${open ? 'menu-open' : ''}`}>
            <Link to="/about">
                <a href="/">
                    <span role="img" aria-label="about us">💁🏻‍♂️</span>
                    About
                </a>
            </Link>

            <Link to="/contact">
                <a href="/">
                    <span role="img" aria-label="price">💸</span>
                    Contact
                </a>
            </Link>

            <div className="hamAuthButtons">
                <Link to="/login"><button className="login">LOG IN</button></Link>
                <Link to='/register'><button className="register">REGISTER</button></Link>
            </div>
        </nav>
    );
};

export default HamMenu;