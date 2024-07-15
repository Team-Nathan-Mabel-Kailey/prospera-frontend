import './Header.css'

const Header = () => {
    return (
        <div>
            <header>
                <div className='headerLeft'>
                    <div className="logo">LOGO</div>

                    <nav>
                        <a href="#" className="active">ABOUT</a>
                        <a href="#">CONTACT</a>
                    </nav>
                </div>
                
                <div className="auth-buttons">
                    <button className="login">Log In</button>
                    <button className="register">Register</button>
                </div>

            </header>
        </div>
    )
}

export default Header
