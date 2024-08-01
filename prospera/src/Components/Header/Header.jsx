import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { NovuProvider, PopoverNotificationCenter, NotificationBell } from '@novu/notification-center';
import { useAuth } from '../AuthContext/AuthContext';
import settingGif from './icons8-settings.gif';
import './Header.css';

let googleTranslateInitialized = false;

const Header = ({ open, setOpen }) => {
    Header.propTypes = {
        open: PropTypes.bool.isRequired,
        setOpen: PropTypes.func.isRequired
    };

    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        if (!googleTranslateInitialized) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
            { pageLanguage: 'en' },
            'googleTranslateElement'
            );
        };

        googleTranslateInitialized = true;

        return () => {
            document.body.removeChild(script);
        };
        }
    }, []);

    return (
        <div className='mainHeader'>
        {/* <NovuProvider subscriberId={'on-boarding-subscriber-id-123'} applicationIdentifier={'9aO_manMoao5'}>
            <PopoverNotificationCenter colorScheme={'light'}>
            {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
            </PopoverNotificationCenter>
        </NovuProvider> */}
        
        {isLoggedIn ? (
            <>
            <nav className='headerLeft'>
                <Link to='/' className='logo'>
                <img src='https://i.postimg.cc/g2WtFXMV/Screenshot-2024-07-18-at-10-21-48-PM-1.png' alt="logo"/>
                </Link>
            </nav>
            <div className="authButtonsLeft">
                <Link to="/dashboard">DASHBOARD</Link>
                <Link to="/news">NEWS</Link>
                <Link to='/chat'>CHATBOT</Link>
                <Link to='/account'>
                <div className='settingsIcon'>
                    <img className="staticImg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEY0lEQVR4nO2aT2xVRRTGf2iwLY+nBoJRWuV/WIMoSgkvETE2LgoxbI0bhKSVsiEacWdS3LhTZEmlENNGYaFxWUxA/ohxgYsi7RNRTAqRRKBqMRYzyXnJZHLvzJ1777x3hfslZ9HeOzPnu2/mzDnfDJQoUaKEH14BfgV+AXq4B9AJVC3PFdG7Ylcs71Wlr0LjoBC5CbwY8XyeRrZhHRHvvQTckucfUVAsMYhcAtqMd96MINxvvNMOTBjvdFFAPALcMRz9BugDBoETwGwE4Vl5NijkzxjPZ4CHKSjORxDKaucoKOYD1wMQvgZUWkVqEzAOTAJbtf8vB04FINuwk8AybbxtwE/ARaAWkvBFY+0dA4aB6YBkG3YbOAwcN2KB+gGCYbIJxHxNRfRg2BoTaW2m9uSjwA7gGWARMFfW5UqgWyL5lylmivKll8A47jkNFcGkUInJbuBqwv4/own4xPNXeC/FGCr5eAf4x9H3IQJjuWPa/SxBTP/fn8DSlONtkD5tM0iP3pnxlJblVBxbzwXgcdmPzSk5ksEH1eePji2romV7aT8uH2up3XlJAOIGVdH7Ca3taxHv1DLm6Vcs4yvfvtNSW+W7Fzo91uhfwBqj/RzgrPHe98CDGUg/nWBN67bYp/P5Wnnmsrdj+nguYgt7g2zYn9CnP9Kko1siyjTTJiJKQFtEnwIezUC4XVJKm0+qLH0h7QBtwGlL5zsTLA1zpnxANuy1+HPK8QMkwh7LtFGJggv7jHYqCK4mPRbIVhflk0paMmMwpvMRj2lYN9p+ESjbU75mxtcxnfsEoFcj2t8ARoEVKXx6K8anMTJgHjBgKRae9exvLKaf3yWD80Etpq9/RSaKEgadurEr9D+GH0Y99tA8LLHurevGNvONhjeaTFiZTfe+fwn3JCTtO6VHWkD2ZR8HOyQAxAWt9Z6ET1iC1oocg1afb9BKGl19tqXtMURHct6W1EcNlniMJmzfEZH/hko8VHGRGQMWcS5JavluzqnlQktqqXzNhHZH8bDL0b5LZJhmFQ9nxOdU2CKlVpbycDhAeXjZ4dOkHLd6oZqDAPB8AAHg/YQ+3RIRI4jE8zew1mj/gJz65SnxrPOUeLxvDxyQhkoY+9Yh4tUNDen1nEW8pY5kaEo0tBn5+8O0Az1pyLQnLYP+IMqlWg6/5SzTXnKoHI3douor3rmwLCLqmunckRyF+G6HED+dorT0xpDHOkp71NIh+3fLj1qQM+GkZG97FhkV0dDMJRFnKuMKit6Ux6WfisK5Xj7AQ0JuFbBRxLevLBlUnM3KbYD76kC8HpLwuPF1PxexvVlXHobkTFifZeoaRjDUZIC6MZWafamlV9Lacblo0xJUAl1bup6wKmsJzgUgrLK8QqKqpXYNOy0y0X4R9OOuHo6J0NAn1xX153eKevWwK0Hp2B9BWJHU0RaRSqoUt5A4oJVnqp5Oe314s+zfhb4+3ECnoxZNekG8IoXD/x49QtpbNy5RokSJ/wDR64aqn8SdSAAAAABJRU5ErkJggg=="/>
                    <img src={settingGif} alt="Hover" className="hoverImg"/>
                </div>
                </Link>
                {isLoggedIn && user && (
                <NovuProvider 
                    subscriberId={user.userID.toString()}
                    applicationIdentifier={import.meta.env.VITE_NOVU_APP_IDENTIFIER}
                >
                    <PopoverNotificationCenter colorScheme={'light'}>
                        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
                    </PopoverNotificationCenter>
                </NovuProvider>
            )}
            </div>
            <div className='auth-buttons'>
                <Link to="/logout"><button className="login">LOG OUT</button></Link>
            </div>
            <div className="burgerAlign">
                <div className='toggleHamburger'>
                    <button className={`burger ${open ? 'burger-open' : 'burgerClose'}`} onClick={() => setOpen(!open)}>
                    <div />
                    <div />
                    <div />
                    </button>
                </div>
            </div>
            </>
        ) : (
            <>
            <div className='headerLeft'>
                <div>
                    <Link to='/' className='logo'>
                        <img src='https://i.postimg.cc/g2WtFXMV/Screenshot-2024-07-18-at-10-21-48-PM-1.png' alt="logo"/>
                    </Link>
                </div>
                <div className='rightLinks'>
                    <Link to="/about" className="active">ABOUT</Link>
                    <Link to="/contact">CONTACT</Link>
                </div>
            </div>
            <div className="auth-buttons">
                <Link to="/login"><button className="login">LOG IN</button></Link>
                <Link to='/register'><button className="register">REGISTER</button></Link>
            </div>
            <div className="burgerAlign">
                <div className='toggleHamburger'>
                    <button className={`burger ${open ? 'burger-open' : 'burgerClose'}`} onClick={() => setOpen(!open)}>
                    <div />
                    <div />
                    <div />
                    </button>
                </div>
            </div>
            </>
        )} 
        <div id="googleTranslateElement"></div>
        </div>
    );
};

export default Header;
