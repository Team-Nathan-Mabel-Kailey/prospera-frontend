import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProgressCircleWidget from '../ProgressCircleWidget/ProgressCircleWidget';
import CountdownTimerWidget from '../CountdownTimerWidget/CountdownTimerWidget';
import './HighlightedGoalWidget.css';
import { FinancialGoalsContext } from '../FinancialGoalsContext/FinancialGoalsContext';

const HighlightedGoalWidget = ( {data, widgetId} ) => {
    const [widgetData, setWidgetData] = useState(data);
    const { financialGoals } = useContext(FinancialGoalsContext);
    let BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const updateHighlightedGoal = async () => {
            const relatedGoalWidget = financialGoals.find(widget => 
                widget.configuration.goals.some(goal => goal.name === widgetData.name)
            );
            
            if (relatedGoalWidget) {
                const relatedGoal = relatedGoalWidget.configuration.goals.find(goal => goal.name === widgetData.name);
                if (relatedGoal) {
                    const updatedData = {
                        ...widgetData,
                        amountSaved: relatedGoal.amountSaved,
                        goalAmount: relatedGoal.goalAmount,
                        endDate: relatedGoal.endDate,
                        isCompleted: relatedGoal.isCompleted
                    };
                    setWidgetData(updatedData);

                    try {
                        await axios.put(`${BASE_URL}/api/widgets/content/${widgetId}`, {
                            configuration: updatedData
                        });
                    } catch (error) {
                        console.error('Error updating highlighted goal widget:', error);
                    }
                }
            }
        };

        updateHighlightedGoal();
    }, [financialGoals, widgetData.name, widgetId]);

   // Check if the goal data is valid
   const isGoalValid = () => {
    return widgetData.name && widgetData.name.trim() !== '' && widgetData.endDate && widgetData.endDate.trim() !== '';
    };

    if (!isGoalValid()) {
        return (
            <div className="highlighted-goal-widget error-state">
                <p>This goal doesn't exist or is invalid. Please delete this widget.</p>
            </div>
        );
    }

    const renderGoalProgress = () => {
        if (widgetData.amountSaved !== '' && widgetData.goalAmount !== '') {
            return <ProgressCircleWidget amountSaved={widgetData.amountSaved} goalAmount={widgetData.goalAmount} isCompleted={widgetData.isCompleted} endDate={widgetData.endDate} />;
        } else {
            return <CountdownTimerWidget endDate={widgetData.endDate} isCompleted={widgetData.isCompleted} />;
        }
    }

    return (
        <div className="highlighted-goal-widget">
            <h2>{widgetData.name}</h2>
            {renderGoalProgress()}
        </div>
    );
};

export default HighlightedGoalWidget;