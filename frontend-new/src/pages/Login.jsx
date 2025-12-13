import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            // Mock successful login
            const userData = { name: "Harsh", email: email, role: "Farmer" };
            localStorage.setItem("krishi_user", JSON.stringify(userData));

            // Dispatch event to update Navbar immediately
            window.dispatchEvent(new Event("storage"));

            setIsLoading(false);
            navigate('/');
        }, 1500);
    };

    return (
        <div className="login-page container">
            <div className="login-card glass">
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Access your smart farming dashboard</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-icon">
                            <Mail size={18} />
                            <input
                                type="email"
                                placeholder="farmer@krishi.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-icon">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                        {isLoading ? (
                            "Authenticating..."
                        ) : (
                            <>Login <ArrowRight size={18} /></>
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account? <a href="#" className="text-gradient">Register</a></p>
                </div>
            </div>
        </div>
    );
}
