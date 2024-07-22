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
    const [isValidNewPassword, setIsValidNewPassword] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (evt) => {
        evt.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/forgot-password', {
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

    return (
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
                           

                        <div className='answerInputArea'>
                            <label>Answer</label>
                            <input
                                type={
                                    showAnswer ? 'text' : 'password'
                                }
                                onChange={(e) => setSecurityAnswer(e.target.value)}
                                required
                            />
                        </div>

                        <div className='showAnswerArea'>
                            <input
                                id='checkAnswerForgot'
                                type='checkbox'
                                value={showAnswer}
                                onChange={() =>
                                    setShowAnswer((prev) => !prev)
                                }
                            />
                            <label htmlFor='check'>Show Answer</label>
                        </div>

                        <label>New Password
                        </label>
                        <input
                            type={
                                showNewPassword ? 'text' : 'password'
                            }
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        

                        <div className='showPassword1AreaForgot'>
                            <input
                                id='checkForgot1'
                                type='checkbox'
                                value={showNewPassword}
                                onChange={() =>
                                    setShowNewPassword((prev) => !prev)
                                }
                            />
                            <label htmlFor='check'>Show Password</label>
                        </div>


                        <label>Retype New Password</label>
                        <input
                            type={
                                showNewPasswordAgain ? 'text' : 'password'
                            }
                            onChange={(e) => setNewPasswordAgain(e.target.value)}
                            required
                        />

                        <div className='showPassword2AreaForgot'>
                            <input
                                id='checkForgot2'
                                type='checkbox'
                                value={showNewPasswordAgain}
                                onChange={() =>
                                    setShowNewPasswordAgain((prev) => !prev)
                                }
                            />
                            <label htmlFor='check'>Show Password</label>
                
                </div>

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
                 />
                    
                    <div className='forgotButtonArea'>
                        <button type='submit' onClick={handleForgotPassword} className='forgotButton' disabled={!isValidNewPassword}>Reset Password</button>
                    </div>
                </div>

                <div className='imageArea'>
                    <img src='https://images.pexels.com/photos/23350492/pexels-photo-23350492/free-photo-of-a-padlock-on-a-fence.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='Picture of plant inside pot filled with coins'/>
                </div>
            </div>
        </div>
    )
}

export default forgotPasswordPage
