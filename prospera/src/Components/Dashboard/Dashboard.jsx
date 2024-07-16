import './Dashboard.css'

const Dashboard = () => {
    return (
        <div>
            <div className="welcomeBack">
                <h2>Welcome back, ____!</h2>
            </div>

            <div className="dashboard">
                <div className='left-column'>
                    <div className='area2'>
                        <div className='area1'> 
                            <img className='image1' src="https://placehold.co/300x200" alt="placeholder" />
                            <div className='area0'>
                                <h3>Header1</h3>
                                <h3>Header1</h3>
                            </div>
                        </div>

                        <h3 className='dashboardBankAccts'>Checkings</h3>
                        <h3 className='dashboardBankAccts'>Savings</h3>
                    </div>

                    <img className='image2 right-column' src="https://preview.redd.it/can-they-please-bring-back-the-old-stocks-widget-v0-tu2me20n0cwb1.jpg?width=1284&format=pjpg&auto=webp&s=217d0fd8abcbfa6eade90e24c873b517e6b583bd" alt="placeholder" />
                </div>

                <div className='area4'>
                    <img className='image3' src="https://placehold.co/200x150" alt="placeholder" />
                    <img className='image3' src="https://placehold.co/200x150" alt="placeholder" />
                    <img className='image3' src="https://placehold.co/200x150" alt="placeholder" />
                    <img className='image3' src="https://placehold.co/200x150" alt="placeholder" />
                </div>

                <div className='chatIcon'>
                    <img src="https://placehold.co/50x50" alt="chat icon" />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
