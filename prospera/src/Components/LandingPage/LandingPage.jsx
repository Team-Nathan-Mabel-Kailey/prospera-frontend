import { useEffect } from "react";
import { useLocation, useParams} from "react-router-dom";
import './LandingPage.css'
import AboutPage from '../AboutPage/AboutPage'
import ContactPage from '../ContactPage/ContactPage'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import LandingImg from "./LandingImage.jpg";

const LandingPage = () => {
    LandingPage.propTypes = {
        scrollTo: PropTypes.string
    };

    const params = useParams()
    const section = params.section;
    const location = useLocation();

    useEffect(() => {
        if (section) {
            const element = document.getElementById(section+'Page');
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            const element = document.getElementById("tempHeader");
            if(element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
            
        }
    }, [section, location]);

    return (
        <>
            <div className='headerSpace' id='tempHeader'></div>
            <div id="landingPageContent" className="landingPageContent">

                <img className='landingImg' src={LandingImg} alt="Landing Page" />
                
                <div className='landingTexts'>
                    <h1 style={{fontSize: 65}}>LET US HELP YOU THRIVE FINANCIALLY TO LIVE FULLY</h1>
                    <div className='landingSlogan'>
                        <p>Track your finances using our Dashboard and build your financial literacy using our AI-powered Chatbot and tailored Newsfeed.</p>
                        <Link to="./register">
                            <button className="getStartedButton">GET STARTED</button>
                        </Link>
                    </div>  
                </div>

                <div className="landingCards">
                    <div className='landingCardContainer'>
                            <figure>
                                <img src="https://staffinghub.com/wp-content/uploads/2022/05/bigstock-Depressed-Desperate-Caucasian-424081190-696x464.jpg" alt="" />
                            </figure>
                        <h3>&quot;Gen Z is the least financially confident generation, as more than 1 in 4 Gen Zers say they are not confident in their financial knowledge and skills.&quot;</h3>
                        <Link to={"https://wallethub.com/blog/generational-finances-survey/133122"} target="_blank" className="read-more">Read more
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                    <div className='landingCardContainer'>
                            <figure>
                                <img src="https://focov.org/wp-content/uploads/2023/05/language-barrier.jpg" alt="" />
                            </figure>
                        <h3>&quot;One in 12 people over the age of five in the U.S. have limited proficiency with the English language and many of these people have trouble accessing products and services from banks and lenders.&quot;</h3>
                        <Link to={"https://d7a3216312da6f8c5faa-a6c4a22c6d23d8694e5e3f94c3d57dde.ssl.cf2.rackcdn.com/660b2327a6414c6f9b059d17743646ca_Financial-Literacy_-A-Guide-for-Immigrants-First-Gen-Americans.pdf"} target="_blank" className="read-more">Read more
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                    <div className='landingCardContainer'>
                            <figure>
                                <img src="https://media.gcflearnfree.org/content/58d03ca2e644ea0374142196_03_20_2017/financialproblemsolving_introimage.jpg" alt="" />
                            </figure>
                        <h3>&quot;Nearly 70% of the foreign-born population in the U.S. hold jobs — a participation rate that exceeds the native-born population — yet poverty rates among immigrant families are more than 20% higher.&quot;</h3>
                        <Link to={"https://www.rescue.org/sites/default/files/document/1591/lg01jpmwhitepaperdigitalfinal.pdf"} target="_blank" className="read-more">Read more
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            <div id="aboutPage" style={{position: "relative"}}>
                <AboutPage />
            </div>

            <div id="contactPage" style={{position: "relative"}}>
                <ContactPage />
            </div>
        </>
    )
}

export default LandingPage
