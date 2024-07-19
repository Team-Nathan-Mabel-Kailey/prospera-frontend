import './Header.css'
import { useAuth } from '../AuthContext/AuthContext';

const Header = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();


    return (
        <div>
            <header>

                {!isLoggedIn ? (
                    <>
                        <div className='headerLeft'>
                            <div>
                                <a href='/' className='logo'>
                                    <img src='https://i.postimg.cc/ZKfHB4mb/Screenshot-2024-07-18-at-10-21-48-PM.png'></img>
                                </a>
                            </div>
                            

                            <nav>
                                <a href="/about" className="active">ABOUT</a>
                                <a href="/contact">CONTACT</a>
                            </nav>
                        </div>
                        
                        <div className="auth-buttons">
                            <a href="/login"><button className="login">LOG IN</button></a>
                            <a href='/register'><button className="register">REGISTER</button></a>
                        </div>

                    </>
                ) : (
                    <>
                        <nav className='headerLeft'>
                            <a href="/dashboard">DASHBOARD</a>
                            <a href="/news">NEWS</a>
                        </nav>
                    </>
                )}
            </header>
        </div>
    )
}

export default Header
