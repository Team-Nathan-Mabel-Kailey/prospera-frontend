import React from 'react'
import { Link } from "react-router-dom";
import './TopicSelectionConfirmed.css'

const TopicSelectionConfirmed = () => {
    return (
        <>
            <div className='headerSpace' id='tempHeader'></div>
            <div className='topicsConfirmedContainer'>
                <h1>Selection Confirmed!</h1>
                <p>Navigate to the News Page to view your recommended feed.</p>
                <Link to="/news"><a>News Feed</a></Link>
            </div>
        </>
    )
}

export default TopicSelectionConfirmed
