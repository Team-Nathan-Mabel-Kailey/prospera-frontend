// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LandingPage from './Components/LandingPage/LandingPage';
import AboutPage from './Components/AboutPage/AboutPage'
import Footer from './Components/Footer/Footer'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/contact" element={} /> */}
        </Routes>
      </Router>
      
      <div>
        
      </div>

      <Footer />
    </>
  )
}

export default App
