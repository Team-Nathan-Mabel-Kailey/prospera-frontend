import { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressCircleWidget from '../ProgressCircleWidget/ProgressCircleWidget';
import CountdownTimerWidget from '../CountdownTimerWidget/CountdownTimerWidget';
import './HighlightedGoalWidget.css';

const HighlightedGoalWidget = ({ data }) => {
    const { name, amountSaved, goalAmount, endDate, isCompleted } = data;

    const renderGoalProgress = () => {
        if (amountSaved !== '' && goalAmount !== '') {
          return <ProgressCircleWidget amountSaved={amountSaved} goalAmount={goalAmount} isCompleted={isCompleted} endDate={endDate} />;
        } else {
          return <CountdownTimerWidget endDate={endDate} />;
        }
    };

    return (
        <div className="highlighted-goal-widget">
            <h2>{name}</h2>
            {renderGoalProgress()}
            
        </div>
    );
};

export default HighlightedGoalWidget;