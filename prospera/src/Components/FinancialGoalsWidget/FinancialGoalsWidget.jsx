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

import { useState, useEffect } from 'react';
import axios from 'axios';
import './FinancialGoalsWidget.css';

const FinancialGoalsWidget = ({ data, id }) => {
    
    const [goals, setGoals] = useState([]);
    const [checkedGoals, setCheckedGoals] = useState(new Set());
    
    useEffect(() => {
        const initialGoals = Object.entries(data)
            .filter(([key, value]) => key.startsWith('goal') && value)
            .map(([key, value]) => ({ id: key, text: value }));
        setGoals(initialGoals);
    }, [data]);

    const handleCheck = async (goalId) => {
        try {
            await axios.put(`http://localhost:3000/api/widgets/content/${id}`, {
                goalId,
                checked: !checkedGoals.has(goalId),
            });
            setCheckedGoals((prevCheckedGoals) => {
                const newCheckedGoals = new Set(prevCheckedGoals);
                if (newCheckedGoals.has(goalId)) {
                    newCheckedGoals.delete(goalId);
                } else {
                    newCheckedGoals.add(goalId);
                }
                return newCheckedGoals;
            });
        } catch (error) {
            console.error('Error updating goal:', error);
        }
    };
    const stopPropagation = (evt) => {
        evt.stopPropagation();
    };

    return (
    <div className="financial-goals-widget">
    <ul>
        {goals.map((goal) => (
            <li key={goal.id} className={checkedGoals.has(goal.id) ? 'checked' : ''}>
                <label htmlFor={`checkbox-${goal.id}`}>
                    <div className="checkbox-wrapper">
                        <input
                            id={`checkbox-${goal.id}`}
                            type="checkbox"
                            checked={checkedGoals.has(goal.id)}
                            onChange={() => handleCheck(goal.id)}
                            onMouseDown={stopPropagation}
                            onTouchStart={stopPropagation}
                        />
                        <span className="custom-checkbox" onMouseDown={stopPropagation}
                            onTouchStart={stopPropagation}>
                            <div className="tick_mark"></div>
                        </span>
                    </div>
                    <span className="goal-text">{goal.text}</span>
                </label>
            </li>
        ))}
    </ul>
</div>
      );
    };

export default FinancialGoalsWidget;

// <div className="financial-goals-widget">
        //     <ul>
        //         {goals.map((goal) => (
        //             <li key={goal.id} className={checkedGoals.has(goal.id) ? 'checked' : ''}>
        //                 <label>
        //                     <input
        //                         onMouseDown={stopPropagation}
        //                         onTouchStart={stopPropagation}
        //                         type="checkbox"
        //                         checked={checkedGoals.has(goal.id)}
        //                         onChange={() => handleCheck(goal.id)}
        //                     />
        //                     {goal.text}
        //                 </label>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    //     <div className="financial-goals-widget">
    //     <ul>
    //         {goals.map((goal) => (
    //             <li key={goal.id} className={checkedGoals.has(goal.id) ? 'checked' : ''}>
    //                 <div className="checkbox-wrapper">
    //                     <input
    //                         id={`checkbox-${goal.id}`}
    //                         type="checkbox"
    //                         checked={checkedGoals.has(goal.id)}
    //                         onChange={() => handleCheck(goal.id)}
    //                         onMouseDown={stopPropagation}
    //                         onTouchStart={stopPropagation}
    //                     />
    //                     <label htmlFor={`checkbox-${goal.id}`}>
    //                         <div className="tick_mark"></div>
    //                     </label>
    //                 </div>
    //                 <span>{goal.text}</span>
    //             </li>
    //         ))}
    //     </ul>
    // </div>