import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './ForgotPasswordPage.css';

const forgotPasswordPage = () => {
    const [answer, setAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/users/forgot', {
                username,
                password
            });
            // Store token in localStorage
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');  // Navigate to dashboard
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='forgotBody'>
            <div className='forgotBox'>
                <form className='forgotForm'>
                    <Link to="/login" className="return">
                        <span> &lt; </span>
                    </Link>
                    <div className='forgotDescription'>
                        <h1>Forgot Password</h1>
                        <p>Enter your answer to the security question</p>
                    </div>

                    <div className='securityQuestionArea'>
                        <p><strong>Security question:</strong> What city were you born in?</p>
                    </div>

                    <div className='answerInputArea'>
                        <label>Answer</label>
                        <input
                            type={
                                showAnswer ? 'text' : 'password'
                            }
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                        />
                    </div>

                    <div className='showAnswerArea'>
                        <input
                            id='check'
                            type='checkbox'
                            value={showAnswer}
                            onChange={() =>
                                setShowAnswer((prev) => !prev)
                            }
                        />
                        <label htmlFor='check'>Show Answer</label>
                    </div>
                    
                    <div className='forgotButtonArea'>
                        <button type='submit' onClick={handleLogin} className='forgotButton'>Next</button>
                    </div>
                </form>

                <div className='imageArea'>
                    <img src='https://images.pexels.com/photos/23350492/pexels-photo-23350492/free-photo-of-a-padlock-on-a-fence.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='Picture of plant inside pot filled with coins'/>
                </div>
            </div>
        </div>
    )
}

export default forgotPasswordPage
