import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TopicSelectionPage.css';

const topicsList = [
    'Stocks', 'Budgeting', 'Debt', 'Investing', 'Maintaining Good Credit', 
    'Retirement', 'Banks', 'Credit Card Tips', 'Net Worth', 
    'Paying Bills', 'Spending', 'Student Loans'
];

const TopicSelectionPage = () => {
    const [selectedTopics, setSelectedTopics] = useState([]);
    const navigate = useNavigate();

    const handleTopicToggle = (topic) => {
        setSelectedTopics((prev) =>
            prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
        );
    };

    const handleSubmit = async () => {
        const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage on login
        console.log('UserId:', userId);
        console.log('Selected Topics:', selectedTopics);

        try {
            const response = await axios.post('http://localhost:3000/users/save-topics', { userId, topics: selectedTopics });
            console.log('Response:', response.data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to save topics:', error);
        }
    };

    const handleSkip = () => {
        navigate('/news');
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
