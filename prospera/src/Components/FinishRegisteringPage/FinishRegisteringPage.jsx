import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FinishRegisteringPage.css';

const FinishRegisteringPage = () => {
    const [username, setUsername] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const navigate = useNavigate();

    const handleFinishRegistering = async (evt) => {
        evt.preventDefault();
        try {
            await axios.post('http://localhost:3000/finish-registering', {
                username,
                securityAnswer
            });
            navigate('/');
        } catch (error) {
            console.error('Error finishing registration:', error);
        }
    };

    return (
        <div className='finishRegisteringBody'>
            <div className='finishRegisteringBox'>
                <form className='finishRegisteringForm' onSubmit={handleFinishRegistering}>
                    <div className='finishRegisteringDescription'>
                        <h1>Finish Registering</h1>
                        <p>Complete your registration by setting a username and security answer</p>
                    </div>

                    <label>Username
                    </label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label>Security Answer
                    </label>
                    <input
                        type='text'
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                        required
                    />

                    <div className='finishRegisteringButtonArea'>
                        <button type='submit' className='finishRegisteringButton'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FinishRegisteringPage;
