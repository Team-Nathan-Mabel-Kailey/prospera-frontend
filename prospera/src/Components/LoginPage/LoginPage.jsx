import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    const handleLogin = async (evt) => {
        evt.preventDefault();
        try {
            console.log('Logging in...');
            const response = await axios.post('http://localhost:3000/users/login', {
                username,
                password
            });
            const { token } = response.data;
            // Store token in localStorage
            console.log(response)
            console.log('Token:', token);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');  // Navigate to dashboard
            console.log('Logged in successfully');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='loginBody'>
            <div className='loginBox'>
                <form className='loginForm'>
                    <div className='loginDescription'>
                        <h1>Login</h1>
                        <p>Sign in to continue with us</p>
                    </div>

                    <label>Username
                    <input
                    id='usernameLogin'
                        type='text'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    </label>
                    
                    <label>Password
                    <input
                    id='passwordLogin'
                        type={
                            showPassword ? 'text' : 'password'
                        }
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </label>
                    

                    <div className='showPasswordArea'>
                        <input
                            id='check'
                            type='checkbox'
                            value={showPassword}
                            onChange={() =>
                                setShowPassword((prev) => !prev)
                            }
                        />
                        <label htmlFor='check'>Show Password</label>
                    </div>

                    <a href='/forgot'>Forgot password?</a>
                    
                    <div className='loginButtonArea'>
                        <button type='submit' onClick={handleLogin} className='loginButton'>Login</button>
                        <button onClick={() => navigate('/register')} className='goToRegisterButton'>Go to Register</button>
                    </div>
                </form>

                <div className='imageArea'>
                    <img src='https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Picture of plant inside pot filled with coins'/>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
