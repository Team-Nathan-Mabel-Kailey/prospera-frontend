import './Header.css';
import { useAuth } from '../AuthContext/AuthContext';
import { Link } from 'react-router-dom';
const Header = () => {
    const { isLoggedIn } = useAuth();
    return (
        <div>
            <header>
                {isLoggedIn ? (
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
                ) : (
                    <>
                        <div className='headerLeft'>
                            <div>
                                <Link to='/' className='logo'>
                                    <img src='https://i.postimg.cc/g2WtFXMV/Screenshot-2024-07-18-at-10-21-48-PM-1.png' alt="logo"/>
                                </Link>
                            </div>
                            <nav>
                                <Link to="/about" className="active">ABOUT</Link>
                                <Link to="/contact">CONTACT</Link>
                            </nav>
                        </div>
                        <div className="auth-buttons">
                            <Link to="/login"><button className="login">LOG IN</button></Link>
                            <Link to='/register'><button className="register">REGISTER</button></Link>
                        </div>
                    </>
                )} 
            </header>
        </div>
    );
}
export default Header;
