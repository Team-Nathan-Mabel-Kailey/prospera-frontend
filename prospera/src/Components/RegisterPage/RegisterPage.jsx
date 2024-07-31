import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist";
import './RegisterPage.css';
import { useAuth } from '../AuthContext/AuthContext';
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showSecurityAnswer, setShowSecurityAnswer] = useState(false);
    const [showIcon1, setShowIcon1] = useState('https://img.icons8.com/ios-glyphs/30/closed-eye--v1.png');
    const [showIcon2, setShowIcon2] = useState('https://img.icons8.com/ios-glyphs/30/closed-eye--v1.png');
    const [showIcon3, setShowIcon3] = useState('https://img.icons8.com/ios-glyphs/30/closed-eye--v1.png');
    const [isValidPassword, setIsValidPassword] = useState(false);
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

  //handle register
    const handleRegister = async (evt) => {
        evt.preventDefault();
        try {
        //register the user
        const response = await axios.post(
            'https://prospera-api.onrender.com/users/register',
            { username, email, password, securityAnswer }
        );
        //login the user
        const loginResponse = await axios.post(
            'https://prospera-api.onrender.com/users/login',
            { username, password }
        );
            const {hasCompletedTopics} = response.data;

            console.log(response);
            setIsLoggedIn(true);
            if (hasCompletedTopics) {
                navigate('/dashboard');
            } else {
                navigate('/topic-selection');
            }
        // Store the token in the localstorage as token
        localStorage.setItem('token', loginResponse.data.token);
        if (hasCompletedTopics) {
        navigate('/dashboard');
        } else {
            navigate('/topic-selection');
        }
        } catch (error) {
        alert('Registration failed. Try again.');
        }
    };

    const handleDisplaySecret1 = () => {
        setShowPassword1((prev) => !prev);
        
        if (showIcon1 == 'https://img.icons8.com/ios-glyphs/30/visible--v1.png') {
            setShowIcon1('https://img.icons8.com/ios-glyphs/30/closed-eye--v1.png');
        }

        else {
            setShowIcon1('https://img.icons8.com/ios-glyphs/30/visible--v1.png');
        }
    }

    const handleDisplaySecret2 = () => {
        setShowPassword2((prev) => !prev);
        
        if (showIcon2 == 'https://img.icons8.com/ios-glyphs/30/visible--v1.png') {
            setShowIcon2('https://img.icons8.com/ios-glyphs/30/closed-eye--v1.png');
        }

        else {
            setShowIcon2('https://img.icons8.com/ios-glyphs/30/visible--v1.png');
        }
    }

    const handleDisplaySecret3 = () => {
        setShowSecurityAnswer((prev) => !prev);
        
        if (showIcon3 == 'https://img.icons8.com/ios-glyphs/30/visible--v1.png') {
            setShowIcon3('https://img.icons8.com/ios-glyphs/30/closed-eye--v1.png');
        }

        else {
            setShowIcon3('https://img.icons8.com/ios-glyphs/30/visible--v1.png');
        }
    }

    return (
        <>
        <div className='headerSpace' id='tempHeader'></div>
        
        <div className='registerBody'>
        <div className='registerBox'>
            <div className='imageArea'>
                <img src='https://images.unsplash.com/photo-1632849508137-3ef430962c8e?q=80&w=3109&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Picture of plant inside pot filled with coins'/>
            </div>

            <form className='registerForm'>
                <div className='registerDescription'>
                    <h1>Sign Up</h1>
                    <p>Already have an account? <Link to="/login"> <a>Log in</a></Link></p>
                </div>

                <label>Email</label>
                <input
                    type='text'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Username</label>
                <input
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <div className='showSecret'>
                    <label>Password</label>
                    <button className='showPassword1Btn'type="button" title="Show Password" onClick={handleDisplaySecret1}>         
                        <span className='showSymbol'>
                            <img src={showIcon1}></img>
                        </span>
                    </button> 
                </div>

                <input
                    type={
                        showPassword1 ? 'text' : 'password'
                    }
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className='showSecret'>
                    <label>Retype Password</label>
                    <button className='showPassword2Btn'type="button" title="Show Password" onClick={handleDisplaySecret2}>         
                        <span className='showSymbol'>
                            <img src={showIcon2}></img>
                        </span>
                    </button> 
                </div>

                <input
                    type={
                        showPassword2 ? 'text' : 'password'
                    }
                    onChange={(e) => setPasswordAgain(e.target.value)}
                    required
                />


                <PasswordChecklist
                    rules={[
                        "minLength",
                        "number",
                        "capital",
                        "match",
                    ]}
                    minLength={8}
                    value={password}
                    valueAgain={passwordAgain}
                    onChange={setIsValidPassword}
                    className='passwordChecklist'
                />

                <div className='questionArea'>
                    <p><b>Security question: </b> What city were you born in?</p>
                </div>
                
                <div className='showSecret'>
                    <label>Answer</label>
                    <button className='showPassword3Btn'type="button" title="Show Password" onClick={handleDisplaySecret3}>         
                        <span className='showSymbol'>
                            <img src={showIcon3}></img>
                        </span>
                    </button> 
                </div>

                <input
                    type={
                        showSecurityAnswer ? 'text' : 'password'
                    }
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    required
                />
                
                <div className='registerButtonArea'>
                    <button onClick={handleRegister} className='registerButton' disabled={!isValidPassword}>CREATE ACCOUNT</button>
                </div>
            </form>
            
        </div>
        </div>
        </>
    );
};

export default Register;