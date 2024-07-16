// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LandingPage from './Components/LandingPage/LandingPage';
import AboutPage from './Components/AboutPage/AboutPage'
import Header from './Components/Header/Header';
import ContactPage from './Components/ContactPage/ContactPage'
import Footer from './Components/Footer/Footer'

function App() {
  return (
    <>
      <Header />
      
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>

      <div>
        <Footer />
      </div>
      
    </>
  )
}

export default App
