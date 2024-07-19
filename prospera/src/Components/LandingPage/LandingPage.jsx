import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './LandingPage.css'
import AboutPage from '../AboutPage/AboutPage'
import ContactPage from '../ContactPage/ContactPage'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


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

                <div className="landingCards">
                    <div className='landingCardContainer'>
                            <figure>
                                <img src="https://placehold.jp/400x200.png" alt="" />
                            </figure>
                        <h3>Placeholder</h3>

                        {/* <Link to={`/news/${author}`} state={{title, content, createdAt, image}} className="read-more">Read more */}
                        <Link to={"/"} target="_blank" className="read-more">Read more
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>

                    <div className='landingCardContainer'>
                            <figure>
                                <img src="https://placehold.jp/400x200.png" alt="" />
                            </figure>
                        <h3>Placeholder</h3>

                        {/* <Link to={`/news/${author}`} state={{title, content, createdAt, image}} className="read-more">Read more */}
                        <Link to={"/"} target="_blank" className="read-more">Read more
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>

                    <div className='landingCardContainer'>
                            <figure>
                                <img src="https://placehold.jp/400x200.png" alt="" />
                            </figure>
                        <h3>Placeholder</h3>

                        {/* <Link to={`/news/${author}`} state={{title, content, createdAt, image}} className="read-more">Read more */}
                        <Link to={"/"} target="_blank" className="read-more">Read more
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
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
