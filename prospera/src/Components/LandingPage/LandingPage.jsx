import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './LandingPage.css'
import AboutPage from '../AboutPage/AboutPage'
import ContactPage from '../ContactPage/ContactPage'
import PropTypes from 'prop-types';


const LandingPage = ({ scrollTo }) => {
    // Add prop validation for 'scrollTo'
    LandingPage.propTypes = {
        scrollTo: PropTypes.string
    };
    const location = useLocation();
    useEffect(() => {
        if (scrollTo) {
            const element = document.getElementById(scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [scrollTo, location]);

    return (
        <>
            <div className="landingPageContent">
                <img className='landingImg' src="https://images.unsplash.com/photo-1517768692594-b4295586b7d6?q=80&w=3576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Landing Page" />
                
                <div className='landingTexts'>
                    <h1>Prospera</h1>
                    <div className='landingSlogan'>
                        <p >Thrive Financially, Live Fully</p>
                    </div>  
                </div>
            </div>

            <div id="aboutPage" style={{ height: "100vh", paddingTop: "90px"}}>
                <AboutPage />
            </div>

            <div id="contactPage" style={{ height: "100vh", paddingTop: "50px"}}>
                <ContactPage />
            </div>
        </>
    )
}

export default LandingPage
