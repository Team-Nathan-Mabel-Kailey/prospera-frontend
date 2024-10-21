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

    const fetchUserData = async (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const response = await axios.get(`${BASE_URL}/users/${decodedToken.userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUser(response.data);
            setIsLoggedIn(true);
            setNovuSubscriberId(response.data.userID.toString());
        } catch (error) {
            console.error('Error fetching user data:', error);
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetchUserData(token);
        } else {
            console.warn('No token found in localStorage');
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, novuSubscriberId, setNovuSubscriberId, fetchUserData }}>
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
