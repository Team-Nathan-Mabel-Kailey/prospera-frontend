import './AboutPage.css'

const AboutPage = () => {
    return (
        <>
            <div className='aboutBody'>
                <div className='leftAboutBody'>
                    <h1>The Path to <br /><em>Prospera</em></h1>
                </div>

                <div className='rightAboutBody'>
                    <p>Managing finances can be challenging, especially for young adults transitioning into independence and immigrants adapting to a new financial landscape. Our web app aims to simplify and streamline personal finance management, providing users with the resources and guidance they need to achieve financial stability and growth.</p>
                    <button className='aboutLogInButton'>Log In</button>
                </div>
            </div>

            <div className='teamAbout'>
                    <h2>Meet MKN-force!</h2>
                    <div className='team'>
                        <div className='teamMember'>
                            <img src='https://ca.slack-edge.com/E7T5PNK3P-U07685Z465A-b44ceb4c18af-512' alt='team member' />
                            <h3>Mabel Inoa Mejia</h3>
                            <p>Software Developer</p>
                        </div>
                        <div className='teamMember'>
                            <img src='https://ca.slack-edge.com/T06TC06DGC8-U06T1RV0MCH-2dffecccbd1d-512' alt='team member' />
                            <h3>Kailey Chavez</h3>
                            <p>Software Developer</p>
                        </div>
                        <div className='teamMember'>
                            <img src='https://ca.slack-edge.com/E7T5PNK3P-U076UF9NBME-0edbd7b74d3f-512' alt='team member' />
                            <h3>Nathan Quiroa</h3>
                            <p>Software Developer</p>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default AboutPage
