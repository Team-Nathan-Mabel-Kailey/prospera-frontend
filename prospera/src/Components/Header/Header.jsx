import './Header.css'

const Header = () => {
    return (
        <div>
            <header>
                <div className='headerLeft'>
                    <div>
                        <a href='/' className='logo'>LOGO</a>
                    </div>
                    

                    <nav>
                        <a href="/about" className="active">ABOUT</a>
                        <a href="/contact">CONTACT</a>
                        <a href="/dashboard">DASHBOARD</a>
                        <a href="/news">NEWS</a>
                    </nav>
                </div>
                
                <div className="auth-buttons">
                    <a href="/login"><button className="login">Log In</button></a>
                    <a href='/register'><button className="register">Register</button></a>
                </div>

            </header>
        </div>
    )
}

export default Header
