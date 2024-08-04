import './HamMenu.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import { NovuProvider, PopoverNotificationCenter, NotificationBell } from '@novu/notification-center';
import PropTypes from 'prop-types';
import settingGif from '../../../public/icons8-settings.gif';


const HamMenu = ({ open }) => {
    const { user, isLoggedIn } = useAuth();

    HamMenu.propTypes = {
        open: PropTypes.bool.isRequired
    };

    return (
        <nav className={`menu ${open ? 'menu-open' : ''}`}>
            {isLoggedIn ? (
                <div className='loggedInBurger'>
                    <Link to="/dashboard">DASHBOARD</Link>
                    <Link to="/news">NEWS</Link>
                    <Link to='/chat'>CHATBOT</Link>
                    <Link to='/account'>
                    <div className='settingsIcon'>
                        <img className="staticImg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEY0lEQVR4nO2aT2xVRRTGf2iwLY+nBoJRWuV/WIMoSgkvETE2LgoxbI0bhKSVsiEacWdS3LhTZEmlENNGYaFxWUxA/ohxgYsi7RNRTAqRRKBqMRYzyXnJZHLvzJ1777x3hfslZ9HeOzPnu2/mzDnfDJQoUaKEH14BfgV+AXq4B9AJVC3PFdG7Ylcs71Wlr0LjoBC5CbwY8XyeRrZhHRHvvQTckucfUVAsMYhcAtqMd96MINxvvNMOTBjvdFFAPALcMRz9BugDBoETwGwE4Vl5NijkzxjPZ4CHKSjORxDKaucoKOYD1wMQvgZUWkVqEzAOTAJbtf8vB04FINuwk8AybbxtwE/ARaAWkvBFY+0dA4aB6YBkG3YbOAwcN2KB+gGCYbIJxHxNRfRg2BoTaW2m9uSjwA7gGWARMFfW5UqgWyL5lylmivKll8A47jkNFcGkUInJbuBqwv4/own4xPNXeC/FGCr5eAf4x9H3IQJjuWPa/SxBTP/fn8DSlONtkD5tM0iP3pnxlJblVBxbzwXgcdmPzSk5ksEH1eePji2romV7aT8uH2up3XlJAOIGVdH7Ca3taxHv1DLm6Vcs4yvfvtNSW+W7Fzo91uhfwBqj/RzgrPHe98CDGUg/nWBN67bYp/P5Wnnmsrdj+nguYgt7g2zYn9CnP9Kko1siyjTTJiJKQFtEnwIezUC4XVJKm0+qLH0h7QBtwGlL5zsTLA1zpnxANuy1+HPK8QMkwh7LtFGJggv7jHYqCK4mPRbIVhflk0paMmMwpvMRj2lYN9p+ESjbU75mxtcxnfsEoFcj2t8ARoEVKXx6K8anMTJgHjBgKRae9exvLKaf3yWD80Etpq9/RSaKEgadurEr9D+GH0Y99tA8LLHurevGNvONhjeaTFiZTfe+fwn3JCTtO6VHWkD2ZR8HOyQAxAWt9Z6ET1iC1oocg1afb9BKGl19tqXtMURHct6W1EcNlniMJmzfEZH/hko8VHGRGQMWcS5JavluzqnlQktqqXzNhHZH8bDL0b5LZJhmFQ9nxOdU2CKlVpbycDhAeXjZ4dOkHLd6oZqDAPB8AAHg/YQ+3RIRI4jE8zew1mj/gJz65SnxrPOUeLxvDxyQhkoY+9Yh4tUNDen1nEW8pY5kaEo0tBn5+8O0Az1pyLQnLYP+IMqlWg6/5SzTXnKoHI3douor3rmwLCLqmunckRyF+G6HED+dorT0xpDHOkp71NIh+3fLj1qQM+GkZG97FhkV0dDMJRFnKuMKit6Ux6WfisK5Xj7AQ0JuFbBRxLevLBlUnM3KbYD76kC8HpLwuPF1PxexvVlXHobkTFifZeoaRjDUZIC6MZWafamlV9Lacblo0xJUAl1bup6wKmsJzgUgrLK8QqKqpXYNOy0y0X4R9OOuHo6J0NAn1xX153eKevWwK0Hp2B9BWJHU0RaRSqoUt5A4oJVnqp5Oe314s+zfhb4+3ECnoxZNekG8IoXD/x49QtpbNy5RokSJ/wDR64aqn8SdSAAAAABJRU5ErkJggg=="/>
                        <img src={settingGif} alt="Hover" className="hoverImg"/>
                    </div>
                    </Link>
                    <NovuProvider subscriberId={'user.userID'} applicationIdentifier={'9aO_manMoao5'}>
                        <PopoverNotificationCenter colorScheme={'light'}>
                        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
                        </PopoverNotificationCenter>
                    </NovuProvider>
                </div>
            ) : (
                <div>
                    <Link to="/about">
                        <a href="/">
                            <span role="img" aria-label="about us"></span>
                            About
                        </a>
                    </Link>

                    <Link to="/contact">
                        <a href="/">
                            <span role="img" aria-label="price"></span>
                            Contact
                        </a>
                    </Link>

                    <div className="hamAuthButtons">
                        <Link to="/login"><button className="login">LOG IN</button></Link>
                        <Link to='/register'><button className="register">REGISTER</button></Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default HamMenu;