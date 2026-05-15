import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Sprout, Search } from 'lucide-react';
import { auth, db } from '../utils/firebase';
import { signInAnonymously } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import './RoleSelection.css';

export default function RoleSelection() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleGuestLogin = async () => {
        setIsLoading(true);
        try {
            const result = await signInAnonymously(auth);
            const user = result.user;
            
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            let userData = {
                uid: user.uid,
                name: "Guest Reviewer",
                role: 'farmer',
                isGuest: true
            };

            if (!userSnap.exists()) {
                userData.createdAt = serverTimestamp();
                await setDoc(userRef, userData);
            } else {
                userData = userSnap.data();
            }

            localStorage.setItem("krishi_user", JSON.stringify(userData));
            window.dispatchEvent(new Event("storage"));
            setIsLoading(false);
            
            alert("Welcome Interviewer! You are logged in as a Guest Farmer. Feel free to explore the app, view experts, and test the chat features.");
            navigate('/');
        } catch (error) {
            console.error("Error with guest login:", error);
            if (error.code === 'auth/operation-not-allowed') {
                alert("Developer: Please enable 'Anonymous' Sign-In provider in your Firebase Console.");
            } else {
                alert(`Error: ${error.message}`);
            }
            setIsLoading(false);
        }
    };
    return (
        <div className="role-selection-page container">
            <header className="page-header">
                <h1>Welcome to <span className="text-gradient">Krishi</span></h1>
                <p>Please select your role to continue.</p>
            </header>
            
            <div className="role-cards">
                <Link to="/login?role=farmer" className="role-card glass">
                    <Sprout size={48} className="role-icon farmer" />
                    <h2>I am a Farmer</h2>
                    <p>Access crop diagnosis, market trends, and consult with experts.</p>
                </Link>
                
                <Link to="/login?role=expert" className="role-card glass">
                    <User size={48} className="role-icon expert" />
                    <h2>I am an Expert</h2>
                    <p>Provide consultations and assist farmers with your knowledge.</p>
                </Link>
            </div>

            <div className="guest-section">
                <div className="guest-divider">
                    <span>OR</span>
                </div>
                <button 
                    onClick={handleGuestLogin}
                    disabled={isLoading}
                    className="guest-card glass"
                >
                    <div className="guest-icon">
                        <Search size={32} />
                    </div>
                    <div className="guest-text">
                        <h2>Guest & Interviewer Access</h2>
                        <p>Evaluate the application instantly without needing a test phone number.</p>
                    </div>
                    <div className="guest-action">
                        {isLoading ? "Logging in..." : "Enter as Guest \u2192"}
                    </div>
                </button>
            </div>
        </div>
    );
}
