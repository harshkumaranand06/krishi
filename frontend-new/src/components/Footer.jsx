import React from 'react';
import './Footer.css';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3>Krishi AI</h3>
                    <p>Empowering farmers with next-gen technology.</p>
                </div>

                <div className="footer-section social-links">
                    <a href="#"><Github size={20} /></a>
                    <a href="#"><Twitter size={20} /></a>
                    <a href="#"><Linkedin size={20} /></a>
                </div>

                <div className="footer-section copyright">
                    <p>&copy; 2024 Krishi. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
