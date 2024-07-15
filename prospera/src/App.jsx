// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import AboutPage from './Components/AboutPage/AboutPage'
import ContactPage from './Components/ContactPage/ContactPage'
import Footer from './Components/Footer/Footer'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/"  />
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
