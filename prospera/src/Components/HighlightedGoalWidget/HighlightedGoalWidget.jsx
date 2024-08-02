import { useState, useEffect } from 'react';
import axios from 'axios';
import './HighlightedGoalWidget.css';

const HighlightedGoalWidget = ({ data }) => {
    const { name, amountSaved, goalAmount, endDate, isCompleted } = data;
    let BASE_URL = import.meta.env.VITE_BASE_URL;

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div>
            <p>hiii this is working ig</p>
            <p>{name}</p>
            <p>{endDate}</p>
            <p>{isCompleted}</p>
        </div>
    );
};

export default HighlightedGoalWidget;