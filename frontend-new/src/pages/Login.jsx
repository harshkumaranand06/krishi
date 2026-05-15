import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Phone, User, ArrowRight, UserPlus, ShieldCheck } from 'lucide-react';
import { auth, db } from '../utils/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, signInAnonymously } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import './Login.css';

export default function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const roleParam = searchParams.get('role') || 'farmer';

    useEffect(() => {
        // Cleanup previous recaptcha instance if it exists to prevent "element removed" errors
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
        }

        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved
            }
        });

        return () => {
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }
        }
    }, []);

    const requestOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Format phone number (ensure it has country code)
            const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
            const appVerifier = window.recaptchaVerifier;
            
            const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
            setConfirmationResult(confirmation);
            setShowOTPInput(true);
            setIsLoading(false);
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert(`Error: ${error.message}`);
            setIsLoading(false);
        }
    };

    const verifyOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await confirmationResult.confirm(otp);
            const user = result.user;
            
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            let userData = {
                uid: user.uid,
                phone: user.phoneNumber,
                role: roleParam
            };

            if (userSnap.exists()) {
                userData = userSnap.data();

                // If they clicked "I am an Expert" but their account is currently "farmer"
                if (roleParam === 'expert' && userData.role !== 'expert') {
                    userData.role = 'expert';
                    await updateDoc(userRef, { role: 'expert' });
                }

                localStorage.setItem("krishi_user", JSON.stringify(userData));
                window.dispatchEvent(new Event("storage"));
                setIsLoading(false);

                if (userData.role === 'expert') {
                    if (!userData.qualification) {
                        navigate('/expert-register');
                    } else {
                        navigate('/expert-dashboard');
                    }
                } else {
                    navigate('/');
                }
            } else {
                if (isRegistering) userData.name = name;
                userData.createdAt = serverTimestamp();
                await setDoc(userRef, userData);

                localStorage.setItem("krishi_user", JSON.stringify(userData));
                window.dispatchEvent(new Event("storage"));
                setIsLoading(false);

                if (roleParam === 'expert') {
                    navigate('/expert-register');
                } else {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert(`Invalid OTP. Please try again.`);
            setIsLoading(false);
        }
    };

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
        <div className="login-page container">
            <div className="login-card glass">
                <div className="login-header">
                    <h2>{isRegistering ? "Create Account" : "Welcome Back"}</h2>
                    <p>{isRegistering ? "Join the smart farming community" : "Access your smart farming dashboard"}</p>
                </div>

                {!showOTPInput ? (
                    <form onSubmit={requestOTP}>
                        {isRegistering && (
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-icon">
                                    <User size={18} />
                                    <input
                                        type="text"
                                        placeholder="Harsh Kumar"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label>Phone Number</label>
                            <div className="input-icon">
                                <Phone size={18} />
                                <input
                                    type="tel"
                                    placeholder="+91 9876543210"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                            {isLoading ? (
                                "Sending OTP..."
                            ) : (
                                isRegistering ? <><UserPlus size={18} /> Get OTP</> : <>Get OTP <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={verifyOTP}>
                        <div className="form-group">
                            <label>Enter 6-digit OTP</label>
                            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px'}}>
                                Sent to {phone}
                            </p>
                            <div className="input-icon">
                                <ShieldCheck size={18} />
                                <input
                                    type="text"
                                    placeholder="123456"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength="6"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                            {isLoading ? "Verifying..." : "Verify & Login"}
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-block" 
                            style={{marginTop: '10px', background: 'transparent', border: '1px solid var(--border-glass)', color: 'var(--text-main)'}}
                            onClick={() => setShowOTPInput(false)}
                        >
                            Change Phone Number
                        </button>
                    </form>
                )}

                {!showOTPInput && (
                    <div className="login-footer">
                        {isRegistering ? (
                            <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsRegistering(false); }} className="text-gradient">Login</a></p>
                        ) : (
                            <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsRegistering(true); }} className="text-gradient">Register</a></p>
                        )}
                        
                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Just checking out the project?</p>
                            <button 
                                type="button" 
                                className="btn btn-block" 
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                onClick={handleGuestLogin}
                                disabled={isLoading}
                            >
                                <User size={18} /> Guest Login (For Reviewers)
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Firebase reCAPTCHA container */}
                <div id="recaptcha-container"></div>
            </div>
        </div>
    );
}
