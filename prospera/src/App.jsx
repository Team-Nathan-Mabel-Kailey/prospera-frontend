// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
// import axios from "axios";
import LandingPage from './Components/LandingPage/LandingPage';
import Header from './Components/Header/Header';
import LoginPage from './Components/LoginPage/LoginPage'
import Dashboard from './Components/Dashboard/Dashboard';
import RegisterPage from './Components/RegisterPage/RegisterPage'
import NewsFeed from './Components/NewsFeed/NewsFeed'
import ForgotPasswordPage from './Components/ForgotPasswordPage/ForgotPasswordPage'
import Footer from './Components/Footer/Footer'
import NewsCardDetail from './Components/NewsCardDetail/NewsCardDetail';
// import {ScrollContainer} from 'react-scroll-motion';
import ChatbotPage from './Components/ChatbotPage/ChatbotPage';
import { AuthProvider } from './Components/AuthContext/AuthContext';

function App() {

  return (
    <>
        <AuthProvider>
            
            <Router>
            <Header />

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
                <Route path="/chat" element={<ChatbotPage />} />
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            </Router>

            <Footer />
        </AuthProvider>
    </>
  )
}

export default App
