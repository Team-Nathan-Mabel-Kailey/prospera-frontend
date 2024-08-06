import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import { jwtDecode } from "jwt-decode";
import "./Account.css"

const Account = () => {
    const [userId, setUserId] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [originalData, setOriginalData] = useState({});
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    let BASE_URL = import.meta.env.VITE_BASE_URL;

    const getUserIdFromToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.userId;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    useEffect(() => {
        console.log(isLoggedIn)
        if (!isLoggedIn) {
            navigate('/login'); 
        }

        const token = localStorage.getItem('token');
        console.log("token:", token);

        if (token) {
            const userIdFromToken = getUserIdFromToken(token);
            setUserId(userIdFromToken);
            
            console.log("userIdFromToken:", userIdFromToken);
            
            const fetchUserData = async () => {
                try {
                    const userDataResponse = await axios.get(`${BASE_URL}/users/${userIdFromToken}`);
                    const userData = userDataResponse.data;
                    
                    setOriginalData(userData);
                    setFirstName(userData.firstName);
                    setLastName(userData.lastName);
                    setEmail(userData.email);
                    setUserName(userData.username);
                    console.log("first name:", firstName, "last:", lastName, "email:", email);
                    
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
            
            fetchUserData();
        }
    }, [isLoggedIn, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            try {
                const updatedUserNames = { firstName, lastName };
                await axios.put(`${BASE_URL}/api/settings/name/${userId}`, updatedUserNames);
                // alert('User information updated successfully!');

            } catch (error) {
                console.error('Error updating user names:', error);
                // alert('Failed to update user names.');
            }
            
            try {
                const updateUserEmail = {email, securityAnswer}; 
                await axios.put(`${BASE_URL}/api/settings/email/${userId}`, updateUserEmail)
                // alert('User email updated successfully!');

            } catch (error) {
                console.error('Error updating user email:', error);
                // alert('Failed to update user email.');
            }

        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Failed to update user information.');
        }
        
        alert('User information updated successfully!');

    }

    const handleCancel = () => {
        setFirstName(originalData.firstName);
        setLastName(originalData.lastName);
        setEmail(originalData.email);
        setSecurityAnswer('');
    };

    // const handleBack = () => {
    //     navigate('/settings'); 
    // };


return (
    <>
        <div className='headerSpace' id='tempHeader'></div>
        <div className="settingsBox">
            <div className='updaterUserInfoSpace'>
            {/* <div className='backButtonContainer'>
                <button className='acctButton' onClick={handleBack}>Back</button>
            </div> */}
            
                <h1>ACCOUNT SETTINGS</h1>
                <div className='test'>
                        <div className='settingsTop'>
                            <img src="https://loremflickr.com/150/150/flower"></img>
                            <h2>{firstName && firstName.trim() !== '' ? firstName+" "+lastName : userName}</h2>
                            <h3>{email}</h3>
                        </div>
                    <form onSubmit={handleSubmit} id="updateForm">
                        <div className='firstLastNames'>
                            <div className='textInput'>
                                <label>First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className='textInput'>
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                            
                        <div className='textInput'>
                            <label>Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='textInput'>
                            <label>Security password</label>
                            <input
                                type="text"
                                value={securityAnswer}
                                onChange={(e) => setSecurityAnswer(e.target.value)}
                            />
                            <p>To discard any changes, press cancel.</p>
                        </div>
                        <div className='acctButtons'>
                            <button className="cancelAcctBtn" type="button" onClick={handleCancel}>Cancel</button>
                            <button className="acctButton" type="submit">Update</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
        
    </>
    )
}

export default Account
