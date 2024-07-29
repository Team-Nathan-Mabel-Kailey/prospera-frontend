import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import { jwtDecode } from "jwt-decode";
import "./Account.css"

const Account = () => {
    const [userId, setUserId] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [originalData, setOriginalData] = useState({});
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

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
        console.log(isLoggedIn)
        if (!isLoggedIn) {
            navigate('/login'); 
        }

        const token = localStorage.getItem('token');
        console.log("token:", token);

        if (token) {
            const userIdFromToken = getUserIdFromToken(token);
            setUserId(userIdFromToken);
            
            console.log("userIdFromToken:", userIdFromToken);
            
            const fetchUserData = async () => {
                try {
                    const userDataResponse = await axios.get(`https://prospera-api.onrender.com/users/${userIdFromToken}`);
                    const userData = userDataResponse.data;
                    
                    setOriginalData(userData);
                    setFirstName(userData.firstName);
                    setLastName(userData.lastName);
                    setEmail(userData.email);
                    console.log("first name:", firstName, "last:", lastName, "email:", email);
                    
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
            
            fetchUserData();
        }
    }, [isLoggedIn, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            try {
                const updatedUserNames = { firstName, lastName };
                await axios.put(`https://prospera-api.onrender.com/api/settings/name/${userId}`, updatedUserNames);
                // alert('User information updated successfully!');

            } catch (error) {
                console.error('Error updating user names:', error);
                // alert('Failed to update user names.');
            }
            
            try {
                const updateUserEmail = {email, securityAnswer}; 
                await axios.put(`https://prospera-api.onrender.com/api/settings/email/${userId}`, updateUserEmail)
                // alert('User email updated successfully!');

            } catch (error) {
                console.error('Error updating user email:', error);
                alert('Failed to update user email.');
            }

        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Failed to update user information.');
        }
        
        alert('User information updated successfully!');

    }

    const handleCancel = () => {
        setFirstName(originalData.firstName);
        setLastName(originalData.lastName);
        setEmail(originalData.email);
        setSecurityAnswer('');
    };

    // const handleBack = () => {
    //     navigate('/settings'); 
    // };


return (
    <>
        <div className='headerSpace' id='tempHeader'></div>
        <div className='updaterUserInfoSpace'>
            {/* <div className='backButtonContainer'>
                <button className='acctButton' onClick={handleBack}>Back</button>
            </div> */}
            
            <h1>Settings</h1>
            <div className='settingsTop'>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAI1klEQVR4nO1de0yU2RX/IYjPorZ01RAIVfGV1ERtVzermFjTumtbKyq67W51SrEQE/9QUpMqalEjqaV2MhadKiT45GFIUGICmDKsZCuCMDxEgXVYjDFWVjSUhzxPc75+GNblMQwz994Z+SW/ZDIz33zn/s73uHPuOecD1MU0AD8G8CmAYwDSAfwbQAWARwCaAHTobNLfq9C/k65v86n+G/xbYxgGUwGsAxAPoARADwByItlBZgBbAcwY88b/MR3ALgCfA+h2suBDkfdVACBSt+GdwjgAGwCkAWgXKPpgbNdt+Vi3zWPBg/sFgHsKiE6DsArAbwH4wIPAg/k9gC8VEJjsZB2ACE9wxI8AFCsgKDlIK4AP4Yb4LgCjC2YyJIG9AC4AeA9ugl8BeKGAcORkfg1gIxSGjz6H71VALHLh2cBnti8Uww8A3FVAIBLEIgDBUOhG+1wBUUgw+TL7gWzx1wJoVkAMksQWAOtliR8G4LUCIpBkcjDwE9Hif+IhU0xyElmL7aLE/8nYkY+BnNAJ4GeuFp9j6/9V4IgjRdnqyhszTzUbFRgkKc7nrpiijgfwhQKDIzfhXWf/Wfu7AoMiN2OCs8T/uYeHF8hF7NXjYqPC91ULrM2YMYNWrlxJW7dupZ07d5LBYKAtW7bQihUrtM9k2zdAAM9/NA5Ilj0ILy8vCg0NpcTERHr48CENh+rqajp9+jStWrVK21a2/QDOOSr+hzIvPePHj6eIiAiqqakhR/HgwQPtDPHx8ZH9J+0DR0LLVllGh4aG0v3798lZqKyspNWrV8t0QsVIlzcjZRjq4+NDx44do56eHnI2+Dfj4uLI29tblhN+Z6/43gBqRRs4YcIEunbtGrkaWVlZNGnSJBkO+NLes+A3MsTPy8sjUcjNzSVfX18ZThg2auoFoFKkUV5eXnT16lUSjcuXL8twwP3hkr82iDZqz549JAtRUVEynPDRUA5IF2nM3Llzqb29XZoD2traKDg4WLQDrg4mPqdwt4k05saNGyQbmZmZMnJRB0wI/oNIQ5YuXUq9vb2kApYtWybaCZz2+C18LtIIvgmqgpSUFNEOyB/o8iMsP9/Pz49aW1tJFbS0tNDUqVNFOqALgF9/B/xS5BGwefNmUg0bN24UfRbwjPMNToncOUcrVcOpU6dEO+Cv/R1QLnLnt2/fJtVgsVhEO6C0//VfaNj52bNnpBqePn0qI0z9HXbA+4J3TF1dXaQaOjs7RTuAuZwd8JnowJuq8BUfoPs19IJmocE3V8T7R4vu7m4ZS5h/ZgdkCN4pvXr1ilRDU1OTaPGZqZCRcFVaWkqqobi4WIYDCqHXxgrd8cWLF0k1pIgPR5A+/cdXonccGRlJqsFgMMhwgA0yEq+CgoKUuhH39PRQQECADAdwsrNW4SF85/n5+aQKbt26JUN80iuM5DiA0wlVwaZNm6Q6QEru57hx45yafOUoKioqNFskOaBRyk24j+vWrZOtP61du1aW+G9uwsKnof2ZnJwsTfxz587JFP/NNFRq5cuUKVOoqqpKuPjl5eU0efJk2Q4olBKKeJsBAQHU0NAgTPwnT55oU2HZ4+4LRQgNxg3G+fPnU319vcvFt9lsFBISIn28/YNxQsPRQ3H27NkuXS0rKCigWbNmSR/n2+Fo4Qsyw6WoHzlyhF6/fu004Tn77tChQ7ILNQZdkPFTsQgvJCSErly5osXpHQVvy/lH8+bNkz6eoZYkhS/KjzR/9OjRo1RbW2u38FzWxMUYvK1s++1ZlBeeluIog4KCaNu2bdrlxGw2U2pqqkZ+HRsbS+Hh4RQYGCjdTjt5Ulpi1hhBeqNYOamJY8S3UhOh91IeEwdCNPjXQNnR3ER7zAGQVzEpvEAD7yYHLdCA3kVctoHk4Ry0RAn6nVm2geTh/EipMlU4wIkTJ5K/vz/NmTNHI7/m92Tb5YwyVSmF2hiAHDRbv349xcTEUFJSEhUVFVFjY+OQoQn+jL/D3+VteFv+jZkzZ0ofj87tyrYq8Pb2puXLl9P+/fupsLDQ6QV8vP4cHx+vLYNKqpKv07W1CxGiDFu4cCEZjUYtN1MUXrx4oVXELFiwQKQDdtorft9ZUObKoz0sLEzLx5FZqsr75h4VnJbi4i4q90Zy9PfhfVd0x+VLgNVqJdVQXV2ttUFTpWFTH5KcZcjixYspOzubVEdeXp5WRO5EB/wTo4C/3nhuVBUxCQkJSuWCDge29eTJk5rtTki8+h5GiQ2OrpgtWrRIyVqAkbQ6W7JkiaPi9zrzkSd/G6kBu3fv1rqRuDva2tooOjp61AsuwloX82xCxULs0cJkMo0kh7TIFc+ZCR7uUSV8zUxLSyNPRWZmpj395v4DIAgufF7MgI8smT59upZ34+mwWCw0bdq0wcRnbZZBwHNjvvHoEg6Eqdh+wFXgA22A4B/XWfwUgrC9708aXxczMjLoXUNWVlb/f8+sxTZIeIhPO8dU3lUkJib2HfnCnh/zDYSHh29/+fKlGn3HJIDHHhYWxrm18hATE7OppqbG8fxBN4XNZus+ePDgFqiAXbt2/fDOnTvq9R9wEUpKSpqjo6O1xFplkJCQMCk7O/sLd4r5jBQ8toyMjHv79u2bAlURGxv7x0ePHnncJamhoaH7+PHjf4I7YO/evYG5ublVqvQFHQ14DNevX6/dsWOHMk9PtRtGo/Gz4uLiZnJTWK3WVpPJFAU3h/eJEyeM9fX1neQmsNlsHUaj8R9r1qwZ0VMvlMbNmzcnXLp0KaGyslKdjq1vwWq1tp05cyaRJxTwYHjFxcXts1gsjzs6Okg22Ib8/PyGw4cP79UT094dxMfHB509ezYpJyfnuchWxlwAWFBQ8HVKSkqK2WyeK1sHJWA2m2dfuHDhcFZW1t2ysrIWbiPpzKO8pKSkPT09vdxkMv3lwIEDgbLHqzyioqLeM5lMhuTk5MS0tLSCnJycr8rKyprr6uraHz9+3NXU1NTLwjL5Nb/Hn5WWljbzd1NTUy3nz59PNJlMOwwGAz8RUEn8D/9GT+xOT/QmAAAAAElFTkSuQmCC"></img>
                </div>
            <form onSubmit={handleSubmit} id="updateForm">
                <div className='firstLastNames'>
                    <div className='textInput'>
                        <label>First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className='textInput'>
                        <label>Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                    
                <div className='textInput'>
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='textInput'>
                    <label>Security password</label>
                    <input
                        type="text"
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                    />
                    <p>To discard any changes, press cancel.</p>
                </div>
                <div className='acctButtons'>
                    <button className="cancelAcctBtn" type="button" onClick={handleCancel}>Cancel</button>
                    <button className="acctButton" type="submit">Update</button>
                </div>
            </form>
        </div>
    </>
    )
}

export default Account
