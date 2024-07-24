import { useEffect } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const {setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            navigate('/');
    }, [setIsLoggedIn, navigate])

    return null;
}

export default LogOut;