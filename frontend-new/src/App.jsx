import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

import { LanguageProvider } from './context/LanguageContext';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <LanguageProvider>
      <ChatProvider>
        <Router>
          <div className="app-wrapper">
            <div className="sci-fi-grid"></div>
            <div className="ambient-glow"></div>
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/scan" element={<Scan />} />
                <Route path="/market" element={<Market />} />
                <Route path="/community" element={<Community />} />
                <Route path="/consult" element={<Consult />} />
              </Routes>
            </main>
            <ChatBot />
            <Footer />
          </div>
        </Router>
      </ChatProvider>
    </LanguageProvider>
  );
}

export default App;
