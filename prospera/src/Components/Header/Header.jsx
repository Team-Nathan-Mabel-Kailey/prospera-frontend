// import './Header.css'
// import { useAuth } from '../AuthContext/AuthContext';

// const Header = () => {
//     // const { isLoggedIn, setIsLoggedIn } = useAuth();
//     const { isLoggedIn} = useAuth();


//     return (
//         <div>
//             <header>

//                 {isLoggedIn ? (
//                     <>
//                         <nav className='headerLeft'>
//                                 <a href='/' className='logo'>
//                                     <img src='https://i.postimg.cc/g2WtFXMV/Screenshot-2024-07-18-at-10-21-48-PM-1.png'></img>
//                                 </a>
//                             <a href="/dashboard">DASHBOARD</a>
//                             <a href="/news">NEWS</a>
//                             <a href='/chat'>CHATBOT</a>
//                         </nav>
//                     </>
//                 ) : (
//                     <>
//                         <div className='headerLeft'>
//                             <div>
//                                 <a href='/' className='logo'>
//                                     <img src='https://i.postimg.cc/g2WtFXMV/Screenshot-2024-07-18-at-10-21-48-PM-1.png'></img>
//                                 </a>
//                             </div>
                            

//                             <nav>
//                                 <a href="/about" className="active">ABOUT</a>
//                                 <a href="/contact">CONTACT</a>
//                             </nav>
//                         </div>
                        
//                         <div className="auth-buttons">
//                             <a href="/login"><button className="login">LOG IN</button></a>
//                             <a href='/register'><button className="register">REGISTER</button></a>
//                         </div>

//                     </>
                    
//                 )}
//             </header>
//         </div>
//     )
// }

// export default Header


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
