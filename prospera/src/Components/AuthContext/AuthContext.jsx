// import { createContext, useState, useContext, useEffect } from 'react'
// import PropTypes from 'prop-types';


// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             setIsLoggedIn(true);
//         }
//     }, []);
    
//     return (
//         <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn}}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

// AuthProvider.propTypes = {
//     children: PropTypes.string.isRequired,

// };

import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [novuSubscriberId, setNovuSubscriberId] = useState(null);
    let BASE_URL = import.meta.env.VITE_BASE_URL;
    console.log(BASE_URL);

    useEffect(() => {
        // console.log("u")
        const token = localStorage.getItem('token');
        console.log("token is: ", token)

        if (token) {
            const decodedToken = jwtDecode(token)
            axios.get(`${BASE_URL}/users/${decodedToken.userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setUser(response.data);
                setIsLoggedIn(true);
                setNovuSubscriberId(response.data.userID.toString());
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setIsLoggedIn(false);
            });
        } else {
            console.warn('No token found in localStorage');
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, novuSubscriberId, setNovuSubscriberId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
