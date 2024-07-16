import './LandingPage.css'
const LandingPage = () => {
    return (
        <div className="landingPageContent">
            <img className='landingImg' src="https://images.unsplash.com/photo-1517768692594-b4295586b7d6?q=80&w=3576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Landing Page" />
            
            <div className='landingTexts'>
                <h1>Prospera</h1>
                <div className='landingSlogan'>
                    <p >Thrive Financially, Live Fully</p>
                </div>  
            </div>
            
        </div>
    )
}

export default LandingPage
