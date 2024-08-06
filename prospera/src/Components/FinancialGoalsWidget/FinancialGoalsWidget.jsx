import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './FinancialGoalsWidget.css';
import { FinancialGoalsContext } from '../FinancialGoalsContext/FinancialGoalsContext';

const FinancialGoalsWidget = ({ data, id }) => {
    const [widgetData, setWidgetData] = useState(data);
    const [checkedGoals, setCheckedGoals] = useState(new Set());
    const { updateGoal } = useContext(FinancialGoalsContext);

    let BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const completedGoals = new Set(widgetData.goals.filter(goal => goal.isCompleted).map(goal => goal.name));
        setCheckedGoals(completedGoals);
    }, [widgetData.goals]);

    const handleCheck = async (goalName) => {
        const updatedGoals = widgetData.goals.map(goal => {
            if (goal.name === goalName) {
                return { ...goal, isCompleted: !goal.isCompleted };
            }
            return goal;
        });
        const updatedWidgetData = {
            ...widgetData,
            goals: updatedGoals
        };
        setWidgetData(updatedWidgetData);

        const newCheckedGoals = new Set(checkedGoals);
        if (newCheckedGoals.has(goalName)) {
            newCheckedGoals.delete(goalName);
        } else {
            newCheckedGoals.add(goalName);
        }
        setCheckedGoals(newCheckedGoals);

        await updateGoal({ id, ...updatedWidgetData });

        // Update widget content via API
        try {
            await axios.put(`${BASE_URL}/api/widgets/content/${id}`, {
                configuration: updatedWidgetData
            });
        } catch (error) {
            console.error('Error updating widget content:', error);
            alert('Error updating widget content');
        }
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    // Filter out empty goals
    const nonEmptyGoals = widgetData.goals.filter(goal => goal.name.trim() !== '');

    // Check if all goals are completed
    const allGoalsCompleted = nonEmptyGoals.length > 0 && nonEmptyGoals.every(goal => goal.isCompleted);

    return (
        <div className="financial-goals-widget">
            {widgetData.listName && <h3>{widgetData.listName}</h3>}
            {allGoalsCompleted ? (
                <p className="goals-completed-message">Your goals have been completed!</p>
            ) : (
            <ul>
                {nonEmptyGoals.filter(goal => !goal.isCompleted).map((goal, index) => (
                    <li key={`goal-${goal.name}-${index}`} className={checkedGoals.has(goal.name) ? 'checked' : ''}>
                        <label htmlFor={`checkbox-${goal.name}-${index}`}>
                            <div className="checkbox-wrapper">
                                <input
                                    id={`checkbox-${goal.name}-${index}`}
                                    type="checkbox"
                                    checked={checkedGoals.has(goal.name)}
                                    onChange={() => handleCheck(goal.name)}
                                    onMouseDown={stopPropagation}
                                    onTouchStart={stopPropagation}
                                />
                                <span className="custom-checkbox" onMouseDown={stopPropagation}
                                    onTouchStart={stopPropagation}>
                                    <div className="tick_mark"></div>
                                </span>
                            </div>
                            <span className="goal-text">{goal.name}</span>
                        </label>
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
};

export default FinancialGoalsWidget;