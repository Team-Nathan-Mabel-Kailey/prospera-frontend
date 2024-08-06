// // contexts/FinancialGoalsContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const FinancialGoalsContext = createContext();

// export const FinancialGoalsProvider = ({ children }) => {
//     const [financialGoals, setFinancialGoals] = useState([]);
//     let BASE_URL = import.meta.env.VITE_BASE_URL;
//     let userId = localStorage.getItem('userId');

//     useEffect(() => {
//         const fetchGoals = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/api/widgets/user/financial-goals/${userId}`);
//                 setFinancialGoals(response.data);
//             } catch (error) {
//                 console.error('Error fetching financial goals:', error);
//             }
//         };

//         fetchGoals();
//     }, []);

//     return (
//         <FinancialGoalsContext.Provider value={{ financialGoals, setFinancialGoals }}>
//             {children}
//         </FinancialGoalsContext.Provider>
//     );
// };

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export const FinancialGoalsContext = createContext();

export const FinancialGoalsProvider = ({ children }) => {
    const [financialGoals, setFinancialGoals] = useState([]);
    const [userId, setUserId] = useState(null);
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
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const token = localStorage.getItem('token');
            // console.log('fethcing goals in context')
            if (token) {
                const userIdFromToken = getUserIdFromToken(token);
                // console.log('getting id in context', userIdFromToken);
                setUserId(userIdFromToken);
                const response = await axios.get(`${BASE_URL}/api/widgets/user/financial-goals/${userId}`);
                setFinancialGoals(response.data);
            }
        } catch (error) {
            console.error('Error fetching financial goals:', error);
        }
    };

    const updateGoal = async (updatedGoal) => {
        try {
            await axios.put(`${BASE_URL}/api/widgets/content/${updatedGoal.id}`, {
                configuration: updatedGoal
            });
            await fetchGoals(); // Refetch all goals after update
        } catch (error) {
            console.error('Error updating goal:', error);
        }
    };

    return (
        <FinancialGoalsContext.Provider value={{ financialGoals, setFinancialGoals, updateGoal, fetchGoals }}>
            {children}
        </FinancialGoalsContext.Provider>
    );
};