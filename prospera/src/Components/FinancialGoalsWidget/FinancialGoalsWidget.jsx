// import './FinancialGoalsWidget.css';
// import { useState } from 'react';

// const FinancialGoalsWidget = ({ data }) => {
//     const [goals, setGoals] = useState(Object.entries(data));

//     const handleCheckboxChange = (goalKey) => {
//         // Assuming you have a function `removeGoalFromDatabase` to delete the item from the database
//         removeGoalFromDatabase(goalKey).then(() => {
//             setGoals(goals.filter(([key]) => key !== goalKey));
//         }).catch((error) => {
//             console.error("Error removing goal from database:", error);
//         });
//     };

//     return (
//         <div className="financial-goals-widget">
//             <ul>
//                 {goals.map(([key, value]) => (
//                     <li key={key}>
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 onChange={() => handleCheckboxChange(key)}
//                             />
//                             {value}
//                         </label>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default FinancialGoalsWidget


// THIS IS WHAT I AM WORKING ON
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import './FinancialGoalsWidget.css';

// const FinancialGoalsWidget = ({ data, id }) => {
//   const [goals, setGoals] = useState([data]);
//   console.log(goals);

//   useEffect(() => {
//     const initialGoals = Object.entries(data)
//       .filter(([key, value]) => key.startsWith('goal') && value)
//       .map(([key, value]) => ({ id: key, text: value }));
//     setGoals(initialGoals);
//   }, [data]);

//   const handleCheck = async () => {
//     try {
//       await axios.put(`http://localhost:3000/api/widgets/content/${id}`, {
//         // configuration: 
//       });
//       setGoals(goals.filter(goal => goal.id !== goalId));
//     } catch (error) {
//       console.error('Error updating goal:', error);
//     }
//   };

//   const stopPropagation = (evt) => {
//     evt.stopPropagation();
//   };

//   return (
//     <div className="financial-goals-widget">
//       <h2>Financial Goals Checklist</h2>
//       <ul>
//         {goals.map((goal) => (
//           <li key={goal.id}>
//             <label>
//               <input
//                 onMouseDown={stopPropagation}
//                 onTouchStart={stopPropagation}
//                 type="checkbox"
//                 onChange={() => handleCheck()}
//               />
//               {goal.text}
//             </label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const FinancialGoalsWidget = ({ data, id }) => {
//     const [goals, setGoals] = useState([data]);
//     console.log(goals);

//     useEffect(() => {
//         const initialGoals = Object.entries(data)
//         .filter(([key, value]) => key.startsWith('goal') && value)
//         .map(([key, value]) => ({ id: key, text: value }));
//         setGoals(initialGoals);
//     }, [data]);

//     console.log('goals: ', goals);

//     const handleCheck = async (goalId) => {
//         try {
//         await axios.put(`http://localhost:3000/api/widgets/content/${id}`, {
            
//         });
//         setGoals(goals.filter(goal => goal.id !== goalId));
//         } catch (error) {
//         console.error('Error updating goal:', error);
//         }
//     };

//     const stopPropagation = (evt) => {
//         evt.stopPropagation();
//     };

//     return (
//         <div className="financial-goals-widget">
//         <h2>Financial Goals Checklist</h2>
//         <ul>
//             {goals.map((goal) => (
//             <li key={goal.id}>
//                 <label>
//                 <input
//                     onMouseDown={stopPropagation}
//                     onTouchStart={stopPropagation}
//                     type="checkbox"
//                     onChange={() => handleCheck(goal.id)}
//                 />
//                 {goal.text}
//                 </label>
//             </li>
//             ))}
//         </ul>
//         </div>
//     );
// };

// export default FinancialGoalsWidget;




// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import './FinancialGoalsWidget.css';

// const FinancialGoalsWidget = ({ data, id }) => {
    
//     const [goals, setGoals] = useState([]);
//     const [checkedGoals, setCheckedGoals] = useState(new Set());
    
//     useEffect(() => {
//         const initialGoals = Object.entries(data)
//             .filter(([key, value]) => key.startsWith('goal') && value)
//             .map(([key, value]) => ({ id: key, text: value }));
//         setGoals(initialGoals);
//     }, [data]);

//     const handleCheck = async (goalId) => {
//         try {
//             await axios.put(`http://localhost:3000/api/widgets/content/${id}`, {
//                 goalId,
//                 checked: !checkedGoals.has(goalId),
//             });
//             setCheckedGoals((prevCheckedGoals) => {
//                 const newCheckedGoals = new Set(prevCheckedGoals);
//                 if (newCheckedGoals.has(goalId)) {
//                     newCheckedGoals.delete(goalId);
//                 } else {
//                     newCheckedGoals.add(goalId);
//                 }
//                 return newCheckedGoals;
//             });
//         } catch (error) {
//             console.error('Error updating goal:', error);
//         }
//     };
//     const stopPropagation = (evt) => {
//         evt.stopPropagation();
//     };

//     return (
//     <div className="financial-goals-widget">
//     <ul>
//         {goals.map((goal) => (
//             <li key={goal.id} className={checkedGoals.has(goal.id) ? 'checked' : ''}>
//                 <label htmlFor={`checkbox-${goal.id}`}>
//                     <div className="checkbox-wrapper">
//                         <input
//                             id={`checkbox-${goal.id}`}
//                             type="checkbox"
//                             checked={checkedGoals.has(goal.id)}
//                             onChange={() => handleCheck(goal.id)}
//                             onMouseDown={stopPropagation}
//                             onTouchStart={stopPropagation}
//                         />
//                         <span className="custom-checkbox" onMouseDown={stopPropagation}
//                             onTouchStart={stopPropagation}>
//                             <div className="tick_mark"></div>
//                         </span>
//                     </div>
//                     <span className="goal-text">{goal.text}</span>
//                 </label>
//             </li>
//         ))}
//     </ul>
// </div>
//       );
//     };

// export default FinancialGoalsWidget;


// BASE CODE
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import './FinancialGoalsWidget.css';

// const FinancialGoalsWidget = ({ data, id }) => {

//     return (
//         <div className="financial-goals-widget">
//            <ul>
//               {goals.map((goal) => (
//                     <li key={goal.id} className={checkedGoals.has(goal.id) ? 'checked' : ''}>
//                         <label htmlFor={`checkbox-${goal.id}`}>
//                             <div className="checkbox-wrapper">
//                                 <input
//                                     id={`checkbox-${goal.id}`}
//                                     type="checkbox"
//                                     checked={checkedGoals.has(goal.id)}
//                                     onChange={() => handleCheck(goal.id)}
//                                     onMouseDown={stopPropagation}
//                                     onTouchStart={stopPropagation}
//                                 />
//                                 <span className="custom-checkbox" onMouseDown={stopPropagation}
//                                     onTouchStart={stopPropagation}>
//                                     <div className="tick_mark"></div>
//                                 </span>
//                             </div>
//                             <span className="goal-text">{goal.text}</span>
//                         </label>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
//  };

// export default FinancialGoalsWidget;


// CLAUDE VERSION 1
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import './FinancialGoalsWidget.css';

// const FinancialGoalsWidget = ({ data, id }) => {
//     const [goals, setGoals] = useState(data.goals || []);
//     const [checkedGoals, setCheckedGoals] = useState(new Set());

//     console.log('initial goals: ', goals);

//     useEffect(() => {
//         // Initialize checkedGoals with completed goals
//         const completedGoals = new Set(goals.filter(goal => goal.isCompleted).map(goal => goal.name));
//         setCheckedGoals(completedGoals);
//     }, [goals]);

//     const handleCheck = async (goalName) => {
//         const updatedGoals = goals.map(goal => {
//             if (goal.name === goalName) {
//                 return { ...goal, isCompleted: !goal.isCompleted };
//             }
//             return goal;
//         });

//         setGoals(updatedGoals);

//         // Update checkedGoals
//         const newCheckedGoals = new Set(checkedGoals);
//         if (newCheckedGoals.has(goalName)) {
//             newCheckedGoals.delete(goalName);
//         } else {
//             newCheckedGoals.add(goalName);
//         }
//         setCheckedGoals(newCheckedGoals);

//         // Update widget content via API
//         try {
//             await axios.put(`http://localhost:3000/api/widgets/content/${id}`, {
//                 goals: updatedGoals
//             });
//         } catch (error) {
//             console.error('Error updating widget content:', error);
//             // You might want to handle this error, perhaps by showing a message to the user
//         }
//     };

//     const stopPropagation = (e) => {
//         e.stopPropagation();
//     };

//     return (
//         <div className="financial-goals-widget">
//             <ul>
//                 {goals.filter(goal => !goal.isCompleted).map((goal) => (
//                     <li key={goal.name} className={checkedGoals.has(goal.name) ? 'checked' : ''}>
//                         <label htmlFor={`checkbox-${goal.name}`}>
//                             <div className="checkbox-wrapper">
//                                 <input
//                                     id={`checkbox-${goal.name}`}
//                                     type="checkbox"
//                                     checked={checkedGoals.has(goal.name)}
//                                     onChange={() => handleCheck(goal.name)}
//                                     onMouseDown={stopPropagation}
//                                     onTouchStart={stopPropagation}
//                                 />
//                                 <span className="custom-checkbox" onMouseDown={stopPropagation}
//                                     onTouchStart={stopPropagation}>
//                                     <div className="tick_mark"></div>
//                                 </span>
//                             </div>
//                             <span className="goal-text">{goal.name}</span>
//                         </label>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default FinancialGoalsWidget;


// CLAUDE VERSION 2
import { useState, useEffect } from 'react';
import axios from 'axios';
import './FinancialGoalsWidget.css';

const FinancialGoalsWidget = ({ data, id }) => {
    const [widgetData, setWidgetData] = useState(data);
    const [checkedGoals, setCheckedGoals] = useState(new Set());

    useEffect(() => {
        // Initialize checkedGoals with completed goals
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

        // Update checkedGoals
        const newCheckedGoals = new Set(checkedGoals);
        if (newCheckedGoals.has(goalName)) {
            newCheckedGoals.delete(goalName);
        } else {
            newCheckedGoals.add(goalName);
        }
        setCheckedGoals(newCheckedGoals);

        // Update widget content via API
        try {
            await axios.put(`http://localhost:3000/api/widgets/content/${id}`, {
                configuration: updatedWidgetData
            });
        } catch (error) {
            console.error('Error updating widget content:', error);
            // You might want to handle this error, perhaps by showing a message to the user
        }
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="financial-goals-widget">
            {widgetData.listName && <h3>{widgetData.listName}</h3>}
            <ul>
                {widgetData.goals.filter(goal => !goal.isCompleted).map((goal, index) => (
                    <li key={`goal-${index}`} className={checkedGoals.has(goal.name) ? 'checked' : ''}>
                        <label htmlFor={`checkbox-${index}`}>
                            <div className="checkbox-wrapper">
                                <input
                                    id={`checkbox-${index}`}
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
        </div>
    );
};

export default FinancialGoalsWidget;