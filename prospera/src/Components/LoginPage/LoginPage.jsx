// LoginPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useAuth } from '../AuthContext/AuthContext';

const LoginPage = () => {
    const { setIsLoggedIn, isLoggedIn } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showIcon, setShowIcon] = useState('https://img.icons8.com/ios-glyphs/30/closed-eye--v1.png');
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/'); 
        }
    }, [isLoggedIn, navigate]);

    const handleLogin = async (evt) => {
        evt.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/login', {
                username,
                password
            });
            const { token, userId } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            setIsLoggedIn(true);
            if (hasCompletedTopics) {
                navigate('/dashboard');
            } else {
                navigate('/topic-selection');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleDisplayPassword = () => {
        setShowPassword((prev) => !prev);
        
        if (showIcon == 'https://img.icons8.com/ios-glyphs/30/visible--v1.png') {
            setShowIcon('https://img.icons8.com/ios-glyphs/30/closed-eye--v1.png');
        }

        else {
            setShowIcon('https://img.icons8.com/ios-glyphs/30/visible--v1.png');
        }
    }

    return (
        <>
        <div className='headerSpace' id='tempHeader'></div>
        
        <div className='loginBody'>
            <div className='loginBox'>
                <form className='loginForm'>
                    <div className='loginDescription'>
                        <h1>Login</h1>
                        <p>Sign in to continue with us</p>
                    </div>

                    <label>Username
                    </label>
                    <input
                        id='usernameLogin'
                        type='textarea'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    
                    <div className='loginPasswordArea'>
                        <label>Password
                        </label>
                        <div className='showPasswordArea'>
                            <button className='showPasswordBtn'type="button" title="Show Password" onClick={handleDisplayPassword}>         
                                <span className='showSymbol'>
                                    <img src={showIcon}></img>
                                </span>
                            </button> 
                        </div>
                    </div>
                    <input
                        type={
                            showPassword ? 'text' : 'password'
                        }
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
         
                    <a href='/forgot' className='forgotRedirect'><u>Forgot password?</u></a>
                    
                    <div className='loginButtonArea'>
                        <button type='submit' onClick={handleLogin} className='loginButton'>LOGIN</button>
                        <button onClick={() => navigate('/register')} className='goToRegisterButton'>GO TO REGISTER</button>
                    </div>
                </form>

                <div className='imageArea'>
                    <img src='https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Picture of plant inside pot filled with coins'/>
                </div>
            </div>
        </div>
        </>
    )
}

export default LoginPage
