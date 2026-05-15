import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, User, Phone, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import './ExpertRegister.css';

export default function ExpertRegister() {
    const navigate = useNavigate();
    const { currentUser, userData, setUserData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: userData?.name || '',
        phone: userData?.phone || '',
        qualification: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert("You must be logged in to register as an expert.");
            navigate('/login?role=expert');
            return;
        }

        setLoading(true);
        try {
            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
                name: formData.name,
                qualification: formData.qualification,
                description: formData.description,
                status: "online"
            });

            const updatedData = { ...userData, ...formData, role: 'expert', status: 'online' };
            setUserData(updatedData);
            localStorage.setItem("krishi_user", JSON.stringify(updatedData));
            window.dispatchEvent(new Event("storage"));
            
            navigate('/expert-dashboard');
        } catch (error) {
            console.error("Error updating expert profile:", error);
            alert("Failed to save profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="expert-register-page container">
            <div className="register-box glass">
                <div className="register-header">
                    <h2>Expert Registration</h2>
                    <p>Join Krishi to help farmers globally.</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <User size={20} />
                        <input type="text" name="name" placeholder="Full Name (e.g. Dr. Ramesh)" value={formData.name} required onChange={handleChange} />
                    </div>
                    
                    <div className="input-group">
                        <Phone size={20} />
                        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} readOnly className="opacity-50 cursor-not-allowed" />
                    </div>

                    <div className="input-group">
                        <Briefcase size={20} />
                        <input type="text" name="qualification" placeholder="Qualification (e.g. MSc Agronomy)" required onChange={handleChange} />
                    </div>

                    <div className="input-group align-top">
                        <FileText size={20} className="textarea-icon" />
                        <textarea name="description" placeholder="Brief Description about your expertise..." rows="4" required onChange={handleChange}></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mt-4" disabled={loading}>
                        {loading ? "Saving..." : "Register & Go to Dashboard"}
                    </button>
                </form>
            </div>
        </div>
    );
}
