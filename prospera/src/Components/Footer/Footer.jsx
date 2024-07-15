import './Footer.css'

const Footer = () => {
    return (
        <div>
            <footer className='footer'>
                <h2>Prospera</h2>
                <div className="footerLinks">
                    <a href="">Home</a>
                    <a href="">About</a>
                    <a href="">Contact Us</a>
                </div>

                <h2>\\\\\\\\\\\\</h2>
                
                {/* <div className="footerIcons">
                    <a href="https://www.facebook.com/"><i className="fab fa-facebook"></i>f</a>
                    <a href="https://www.twitter.com/"><i className="fab fa-twitter"></i>t</a>
                    <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i>i</a>
                    <a href="https://www.linkedin.com/"><i className="fab fa-linkedin"></i>l</a>
                </div> */}
                <p>© Copyright 2024, All Rights Reserved</p>
            </footer>
        </div>
    )
}

export default Footer
