import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AnimatedPage from './components/AnimatedPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Consult from './pages/Consult';
import Login from './pages/Login';
import './App.css';

import Scan from './pages/Scan';
import Market from './pages/Market';
import Community from './pages/Community';
import RoleSelection from './pages/RoleSelection';
import ExpertRegister from './pages/ExpertRegister';
import ExpertDashboard from './pages/ExpertDashboard';

import { LanguageProvider } from './context/LanguageContext';
import { ChatProvider } from './context/ChatContext';
import { AuthProvider } from './context/AuthContext';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/scan" element={<AnimatedPage><Scan /></AnimatedPage>} />
        <Route path="/market" element={<AnimatedPage><Market /></AnimatedPage>} />
        <Route path="/community" element={<AnimatedPage><Community /></AnimatedPage>} />
        <Route path="/consult" element={<AnimatedPage><Consult /></AnimatedPage>} />
        <Route path="/role-selection" element={<AnimatedPage><RoleSelection /></AnimatedPage>} />
        <Route path="/expert-register" element={<AnimatedPage><ExpertRegister /></AnimatedPage>} />
        <Route path="/expert-dashboard" element={<AnimatedPage><ExpertDashboard /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ChatProvider>
          <Router>
            <div className="app-wrapper">
              <div className="sci-fi-grid"></div>
              <div className="ambient-glow"></div>
              <div className="ambient-particles"></div>
              <Navbar />
              <main className="main-content">
                  <AnimatedRoutes />
              </main>
              <ChatBot />
              <Footer />
            </div>
          </Router>
        </ChatProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
