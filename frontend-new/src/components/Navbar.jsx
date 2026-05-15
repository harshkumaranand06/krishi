import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf, Scan, Heart, ShoppingBag, Phone, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import './Navbar.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { lang, setLang } = useLanguage();
    const { currentUser, userData } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const currentLang = LANGUAGES.find(l => l.code === lang)?.name || 'English';

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("krishi_user");
            navigate('/role-selection');
        } catch (error) {
            console.error("Logout Error", error);
        }
    };

    const baseNavItems = [
        { name: 'Home', path: '/', icon: Leaf },
        { name: 'Scan', path: '/scan', icon: Scan },
        { name: 'Community', path: '/community', icon: Heart },
        { name: 'Market', path: '/market', icon: ShoppingBag }
    ];

    const navItems = [...baseNavItems];
    
    if (userData?.role === 'expert') {
        navItems.push({ name: 'Dashboard', path: '/expert-dashboard', icon: Phone });
    } else {
        navItems.push({ name: 'Consult', path: '/consult', icon: Phone });
    }

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar glass">
            <div className="container navbar-content">
                <Link to="/" className="logo">
                    <img src="/logo.png" className="logo-img" alt="Logo" />
                    <span className="logo-text">Krishi</span>
                </Link>

                {/* Mobile Menu Toggle */}
                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Desktop Links */}
                <div className="desktop-links">
                    {navItems.map(item => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`nav-link ${isActive(item.path)}`}
                        >
                            {item.icon && <item.icon size={18} />} {item.name}
                        </Link>
                    ))}

                    {/* Language Dropdown (Overlay Pattern) */}
                    <div className="nav-lang-wrapper">
                        <Globe size={18} className="nav-lang-icon" />
                        <span className="nav-lang-text">{currentLang}</span>
                        <ChevronDown size={14} className="nav-lang-arrow" />
                        <select
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                            className="nav-lang-select-overlay"
                        >
                            {LANGUAGES.map(l => (
                                <option key={l.code} value={l.code}>{l.name}</option>
                            ))}
                        </select>
                    </div>

                    {currentUser ? (
                        <button className="auth-btn" onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/role-selection" className="auth-btn">Login</Link>
                    )}
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="mobile-menu glass"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                        >
                            {navItems.map(item => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`mobile-link ${isActive(item.path)}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <item.icon size={18} />
                                    {item.name}
                                </Link>
                            ))}
                            {currentUser ? (
                                <button className="auth-btn mobile-auth" onClick={handleLogout}>Logout</button>
                            ) : (
                                <Link to="/role-selection" className="auth-btn mobile-auth" onClick={() => setIsOpen(false)}>Login</Link>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
