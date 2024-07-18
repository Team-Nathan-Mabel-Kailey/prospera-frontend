// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LandingPage from './Components/LandingPage/LandingPage';
import AboutPage from './Components/AboutPage/AboutPage'
import Header from './Components/Header/Header';
import ContactPage from './Components/ContactPage/ContactPage'
import LoginPage from './Components/LoginPage/LoginPage'
import Dashboard from './Components/Dashboard/Dashboard';
import RegisterPage from './Components/RegisterPage/RegisterPage'
import NewsFeed from './Components/NewsFeed/NewsFeed'
import ForgotPasswordPage from './Components/ForgotPasswordPage/ForgotPasswordPage'
import Footer from './Components/Footer/Footer'
import NewsCardDetail from './Components/NewsCardDetail/NewsCardDetail';

function App() {
  return (
    <>
      <Header />
      
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/about" element={<LandingPage scrollTo="aboutPage" />} />
          <Route path="/contact" element={<LandingPage scrollTo="contactPage" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/news" element={<NewsFeed />} />
          <Route path="/news/:articleId" element={<NewsCardDetail />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>

        <Footer />
      
    </>
  )
}

export default App
