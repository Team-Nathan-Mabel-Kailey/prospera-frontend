import './Header.css';
import { useAuth } from '../AuthContext/AuthContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

let googleTranslateInitialized = false;

const Header = ({open, setOpen}) => {
    Header.propTypes = {
        open: PropTypes.bool.isRequired,
        setOpen: PropTypes.func.isRequired
    };
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        //Makes sure the element is only showing up once
        if (!googleTranslateInitialized) {
            // Load the Google Translate script
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.body.appendChild(script);
        
            // Define the callback function
            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    { pageLanguage: 'en' },
                    'googleTranslateElement'
                );
            };
        
        googleTranslateInitialized = true;

        // Cleanup function
        return () => {
            document.body.removeChild(script);
        };

        }
    }, []);

    return (
        <div className='mainHeader'>
            {isLoggedIn ? (
                // If the user is logged in, then show the logged in navbar
                <>
                    <nav className='headerLeft'>
                        <Link to='/' className='logo'>
                            <img src='https://i.postimg.cc/g2WtFXMV/Screenshot-2024-07-18-at-10-21-48-PM-1.png' alt="logo"/>
                        </Link>
                        <Link to="/dashboard">DASHBOARD</Link>
                        <Link to="/news">NEWS</Link>
                        <Link to='/chat'>CHATBOT</Link>
                    </nav>
                    <div className="auth-buttons">
                        <Link to="/logout"><button className="login">LOG OUT</button></Link>
                    </div>
                </>
            // Else, show the regular navabar
            ) : ( 
                <>
                    <div className='headerLeft'>
                        <div>
                            <Link to='/' className='logo'>
                                <img src='https://i.postimg.cc/g2WtFXMV/Screenshot-2024-07-18-at-10-21-48-PM-1.png' alt="logo"/>
                            </Link>
                        </div>
                        <div className='rightLinks'>
                            <Link to="/about" className="active">ABOUT</Link>
                            <Link to="/contact">CONTACT</Link>
                            <div id="googleTranslateElement">

                            </div>
                        </div>
                    </div>
                    <div className="auth-buttons">
                        <Link to="/login"><button className="login">LOG IN</button></Link>
                        <Link to='/register'><button className="register">REGISTER</button></Link>
                    </div>
                    <div className='toggleHamburger'>
                        <button className={`burger ${open ? 'burger-open' : 'burgerClose'}`} onClick={() => setOpen(!open)}>
                            <div />
                            <div />
                            <div />
                        </button>
                    </div>
                </>
            )} 
        </div>
    );
}
export default Header;
