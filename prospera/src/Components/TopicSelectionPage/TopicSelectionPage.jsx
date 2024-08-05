import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './TopicSelectionPage.css';
import { useAuth } from '../AuthContext/AuthContext';

const topicsList = [
    'Stocks', 'Budgeting', 'Debt', 'Investing', 'Maintaining Good Credit', 
    'Retirement', 'Banks', 'Credit Card Tips', 'Net Worth', 
    'Paying Bills', 'Spending', 'Student Loans'
];

const TopicSelectionPage = () => {
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const { user, fetchUserData } = useAuth();
    let BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.userId);
                fetchUserData(token);
            } catch (error) {
                console.error('Error decoding token:', error);
                navigate('/login'); // Redirect to login if token is invalid
            }
        } else {
            console.warn('No token found in localStorage');
            navigate('/login'); // Redirect to login if no token
        }
    }, [fetchUserData, navigate]);

    const handleTopicToggle = (topic) => {
        setSelectedTopics((prev) =>
            prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
        );
    };

    const handleSubmit = async () => {
        if (!userId) {
            console.error('User is not authenticated');
            navigate('/login');
            return;
        }
        console.log('UserId:', userId);
        console.log('Selected Topics:', selectedTopics);
    
        try {
            const response = await axios.post(`${BASE_URL}/users/save-topics`, { userId, topics: selectedTopics }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Response:', response.data);
            navigate('/topic-selection-confirmed');
        } catch (error) {
            console.error('Failed to save topics:', error.response?.data || error.message);
        }
    };

    const handleSkip = () => {
        navigate('/dashboard');
    };

    return (
        <>
        <div className='headerSpace' id='tempHeader'></div>
        
        <div className="topicSelectionContainer">
            <h1>Select Topics of Interest</h1>
            <div className="topicsList">
                {topicsList.map((topic) => (
                    <button
                        key={topic}
                        className={selectedTopics.includes(topic) ? 'selected' : ''}
                        onClick={() => handleTopicToggle(topic)}
                    >
                        {topic}
                    </button>
                ))}
            </div>
            <div className="actions">
                <button onClick={handleSubmit} className="submitBtn">Submit</button>
                <button onClick={handleSkip} className="skipBtn">Skip</button>
            </div>
        </div>
        </>
    );
};

export default TopicSelectionPage;
