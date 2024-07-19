import './Header.css'

const Header = (loggedIn) => {
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
                        { loggedIn && <a href="/dashboard">DASHBOARD</a>}
                        <a href="/news">NEWS</a>
                    </nav>
                </div>
                
                <div className="auth-buttons">
                    <a href="/login"><button className="login">LOG IN</button></a>
                    <a href='/register'><button className="register">REGISTER</button></a>
                </div>

            </header>
        </div>
    )
}

export default Header
