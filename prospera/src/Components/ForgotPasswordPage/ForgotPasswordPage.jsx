import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist";
import './ForgotPasswordPage.css';

const forgotPasswordPage = () => {
    const [username, setUsername]  = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordAgain, setNewPasswordAgain] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordAgain, setShowNewPasswordAgain] = useState(false);
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [showIcon4, setShowIcon4] = useState('https://img.icons8.com/ios-glyphs/30/closed-eye--v1.png');
    const [showIcon5, setShowIcon5] = useState('https://img.icons8.com/ios-glyphs/30/closed-eye--v1.png');
    const [showIcon6, setShowIcon6] = useState('https://img.icons8.com/ios-glyphs/30/closed-eye--v1.png');
    const [isValidNewPassword, setIsValidNewPassword] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (evt) => {
        evt.preventDefault();
        try {
            const response = await axios.post('https://prospera-api.onrender.com/users/forgot-password', {
                username,
                newPassword,
                securityAnswer
            });
            console.log(response);
            console.log('Password reset successfully')
            navigate('/login');  // Navigate back to login
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    const handleDisplaySecret1 = () => {
        setShowNewPassword((prev) => !prev);
        
        if (showIcon4 == 'https://img.icons8.com/ios-glyphs/30/visible--v1.png') {
            setShowIcon4('https://img.icons8.com/ios-glyphs/30/closed-eye--v1.png');
        }

        else {
            setShowIcon4('https://img.icons8.com/ios-glyphs/30/visible--v1.png');
        }
    }

    const handleDisplaySecret2 = () => {
        setShowNewPasswordAgain((prev) => !prev);
        
        if (showIcon5 == 'https://img.icons8.com/ios-glyphs/30/visible--v1.png') {
            setShowIcon5('https://img.icons8.com/ios-glyphs/30/closed-eye--v1.png');
        }

        else {
            setShowIcon5('https://img.icons8.com/ios-glyphs/30/visible--v1.png');
        }
    }

    const handleDisplaySecret3 = () => {
        setShowAnswer((prev) => !prev);
        
        if (showIcon6 == 'https://img.icons8.com/ios-glyphs/30/visible--v1.png') {
            setShowIcon6('https://img.icons8.com/ios-glyphs/30/closed-eye--v1.png');
        }

        else {
            setShowIcon6('https://img.icons8.com/ios-glyphs/30/visible--v1.png');
        }
    }

    return (
        <>
        <div className='headerSpace' id='tempHeader'></div>
        
        <div className='forgotBody'>
            <div className='forgotBox'>
                <div className='forgotForm'>
                    <Link to="/login" className="return">
                        <span> &lt; </span>
                    </Link>
                    <div className='forgotDescription'>
                        <h1>Forgot Password</h1>
                        <p>Enter your answer to the security question to reset your password</p>
                    </div>

                        <label>Username</label>
                        <input
                            id='usernameLogin'
                            type='textarea'
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <div className='securityQuestionArea'>
                            <p><strong>Security question:</strong> What city were you born in?</p>
                        </div>
                           
                        <div className='showSecret'>
                            <label>Answer</label>
                            <button className='showPassword4Btn'type="button" title="Show Security Answer" onClick={handleDisplaySecret3}>         
                                <span className='showSymbol'>
                                    <img src={showIcon6}></img>
                                </span>
                            </button> 
                        </div>

                        <div className='answerInputArea'>
                            <input
                                type={
                                    showAnswer ? 'text' : 'password'
                                }
                                onChange={(e) => setSecurityAnswer(e.target.value)}
                                required
                            />
                        </div>

                        <div className='showSecret'>
                            <label>New Password</label>
                            <button className='showPassword5Btn'type="button" title="Show Password" onClick={handleDisplaySecret1}>         
                                <span className='showSymbol'>
                                    <img src={showIcon4}></img>
                                </span>
                            </button> 
                        </div>

                        <input
                            type={
                                showNewPassword ? 'text' : 'password'
                            }
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />

                        <div className='showSecret'>
                        <label>Retype New Password</label>
                            <button className='showPassword5Btn'type="button" title="Show Password" onClick={handleDisplaySecret2}>         
                                <span className='showSymbol'>
                                    <img src={showIcon5}></img>
                                </span>
                            </button> 
                        </div>

                        
                        <input
                            type={
                                showNewPasswordAgain ? 'text' : 'password'
                            }
                            onChange={(e) => setNewPasswordAgain(e.target.value)}
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
                  value={newPassword}
                  valueAgain={newPasswordAgain}
                  onChange={setIsValidNewPassword}
                  className='passwordChecklist'
                  id='registerChecklist'
                 />
                    
                    <div className='forgotButtonArea'>
                        <button type='submit' onClick={handleForgotPassword} className='forgotButton' disabled={!isValidNewPassword}>RESET PASSWORD</button>
                    </div>
                </div>

                <div className='imageArea'>
                    <img src='https://images.pexels.com/photos/23350492/pexels-photo-23350492/free-photo-of-a-padlock-on-a-fence.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='Picture of plant inside pot filled with coins'/>
                </div>
            </div>
        </div>
        </>
    )
}

export default forgotPasswordPage
