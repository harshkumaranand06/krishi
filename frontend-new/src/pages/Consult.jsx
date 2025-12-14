import React, { useState, useEffect } from 'react';
import { Phone, Video, MessageSquare, Star, User, Mic, MicOff, VideoOff, PhoneOff, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Consult.css';

const EXPERTS = [
    { id: 1, name: "Dr. A. Swaminathan", role: "Soil Scientist", exp: "15 Years", rating: 4.9, status: "online", img: "S" },
    { id: 2, name: "Dr. Priya Sharma", role: "Plant Pathologist", exp: "8 Years", rating: 4.8, status: "busy", img: "P" },
    { id: 3, name: "Dr. Rajesh Koothrappali", role: "Entomologist", exp: "12 Years", rating: 4.7, status: "online", img: "R" },
    { id: 4, name: "Prof. Vikram Sarabhai", role: "Agri-Tech Expert", exp: "20 Years", rating: 5.0, status: "online", img: "V" },
];

export default function Consult() {
    const [experts, setExperts] = useState(EXPERTS);
    const [loading, setLoading] = useState(true);
    const [activeCall, setActiveCall] = useState(null); // null | 'audio' | 'video'
    const [callStatus, setCallStatus] = useState('idle'); // idle | connecting | connected | ended
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    // Fetch experts from backend on mount
    useEffect(() => {
        const fetchExperts = async () => {
            try {
                const { consultAPI } = await import('../utils/api');
                const response = await consultAPI.getExperts();

                if (response.success && response.data?.experts) {
                    setExperts(response.data.experts);
                } else {
                    // Fallback to hardcoded experts
                    setExperts(EXPERTS);
                }
            } catch (error) {
                console.error('Failed to fetch experts:', error);
                setExperts(EXPERTS);
            } finally {
                setLoading(false);
            }
        };

        fetchExperts();
    }, []);

    const startCall = (type, expert) => {
        setSelectedExpert(expert);
        setActiveCall(type);
        setCallStatus('connecting');

        // Simulate connection delay
        setTimeout(() => {
            setCallStatus('connected');
        }, 2500);
    };

    const endCall = () => {
        setCallStatus('ended');
        setTimeout(() => {
            setActiveCall(null);
            setCallStatus('idle');
            setSelectedExpert(null);
        }, 1000); // 1s delay to show "Call Ended"
    };

    return (
        <div className="consult-page container">
            <header className="page-header">
                <h1><h1>Expert</h1> <span className="text-gradient">Consultation</span></h1>
                <p>Connect with top agricultural scientists and doctors instantly.</p>
            </header>

            <div className="experts-grid">
                {EXPERTS.map(expert => (
                    <div key={expert.id} className="expert-card glass">
                        <div className="expert-header">
                            <div className={`avatar expert-lg ${expert.status}`}>
                                {expert.img}
                            </div>
                            <div className="expert-info">
                                <h3>{expert.name} <ShieldCheck size={16} className="verified" /></h3>
                                <p className="role">{expert.role}</p>
                                <div className="meta">
                                    <span><Star size={14} className="star" /> {expert.rating}</span>
                                    <span>• {expert.exp} Exp</span>
                                </div>
                            </div>
                        </div>
                        <div className="expert-actions">
                            <button className="btn btn-outline" onClick={() => alert("Message feature coming soon!")}>
                                <MessageSquare size={18} /> Chat
                            </button>
                            <button className="btn btn-secondary" onClick={() => startCall('audio', expert)}>
                                <Phone size={18} /> Audio
                            </button>
                            <button className="btn btn-primary" onClick={() => startCall('video', expert)}>
                                <Video size={18} /> Video
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Call Modal Overlay */}
            <AnimatePresence>
                {activeCall && (
                    <motion.div
                        className="call-overlay glass"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <div className={`call-interface ${activeCall === 'video' ? 'video-mode' : 'audio-mode'}`}>

                            {/* Video Placeholder */}
                            {activeCall === 'video' && callStatus === 'connected' && !isVideoOff && (
                                <div className="video-feed simulated">
                                    <div className="remote-video">
                                        <div className="doctor-simulation">
                                            <div className="avatar expert-xl">{selectedExpert?.img}</div>
                                            <p>Dr. is on camera</p>
                                        </div>
                                    </div>
                                    <div className="local-video">You</div>
                                </div>
                            )}

                            {/* Avatar for Audio or Video Off */}
                            {(activeCall === 'audio' || isVideoOff || callStatus !== 'connected') && (
                                <div className="call-avatar">
                                    <div className="avatar expert-xxl pulse-ring">
                                        {selectedExpert?.img}
                                    </div>
                                </div>
                            )}

                            <div className="call-info">
                                <h2>{selectedExpert?.name}</h2>
                                <p className="status-text">
                                    {callStatus === 'connecting' && "Connecting..."}
                                    {callStatus === 'connected' && <span className="live-timer">00:42</span>}
                                    {callStatus === 'ended' && "Call Ended"}
                                </p>
                            </div>

                            <div className="call-controls">
                                <button
                                    className={`control-btn ${isMuted ? 'active' : ''}`}
                                    onClick={() => setIsMuted(!isMuted)}
                                >
                                    {isMuted ? <MicOff /> : <Mic />}
                                </button>

                                {activeCall === 'video' && (
                                    <button
                                        className={`control-btn ${isVideoOff ? 'active' : ''}`}
                                        onClick={() => setIsVideoOff(!isVideoOff)}
                                    >
                                        {isVideoOff ? <VideoOff /> : <Video />}
                                    </button>
                                )}

                                <button className="control-btn end-call" onClick={endCall}>
                                    <PhoneOff />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
