// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import AboutPage from './Components/AboutPage/AboutPage'
import Footer from './Components/Footer/Footer'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/"  />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
      
      <div>
        
      </div>

      <Footer />
    </>
  )
}

export default App
