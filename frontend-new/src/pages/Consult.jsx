import React, { useState, useEffect, useRef } from 'react';
import { Phone, Video, MessageSquare, Star, User, Mic, MicOff, VideoOff, PhoneOff, ShieldCheck, Lock, Unlock, Send, Loader2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { db } from '../utils/firebase';
import { collection, query, where, onSnapshot, addDoc, getDocs, serverTimestamp, orderBy } from 'firebase/firestore';
import './Consult.css';

const EXPERTS = [
    { id: 1, name: "Dr. Sahana Viswanath", role: "Agricultural Scientist", exp: "15 Years", rating: 4.9, status: "online", img: "/sahana.png", isImage: true },
    { id: 2, name: "Sukrutha C Basappa", role: "Plant Pathologist", exp: "8 Years", rating: 4.8, status: "busy", img: "/sukrutha.png", isImage: true },
    { id: 3, name: "Ananya", role: "Crop Advisor", exp: "5 Years", rating: 4.7, status: "online", img: "/Ananya.png", isImage: true },
    { id: 4, name: "Dhriti", role: "Agronomist", exp: "6 Years", rating: 4.6, status: "online", img: "/Dhriti.jpeg", isImage: true },
    { id: 5, name: "Harshdeep", role: "Soil Expert", exp: "4 Years", rating: 4.8, status: "busy", img: "/Harshdeep.png", isImage: true },
    { id: 6, name: "Harsh", role: "Agri-Tech Specialist", exp: "7 Years", rating: 4.9, status: "online", img: "/Harsh.png", isImage: true },
];

export default function Consult() {
    const { currentUser, userData } = useAuth();
    const [experts, setExperts] = useState(EXPERTS);
    const [loading, setLoading] = useState(false);
    
    // New Workflow States
    const [requests, setRequests] = useState({}); // { expertId: 'pending' | 'approved' }
    const [activeChat, setActiveChat] = useState(null); // The expert object currently in chat
    const [currentChatId, setCurrentChatId] = useState(null);
    const [callsUnlocked, setCallsUnlocked] = useState(false); // Can farmer call?
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    
    // Call States
    const [activeCall, setActiveCall] = useState(null); // null | 'audio' | 'video'
    const [callStatus, setCallStatus] = useState('idle'); // idle | connecting | connected | ended
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [callDuration, setCallDuration] = useState(0);

    const [toastMessage, setToastMessage] = useState(null);

    const chatEndRef = useRef(null);

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Fetch registered experts and merge with static
    useEffect(() => {
        const q = query(collection(db, 'users'), where('role', '==', 'expert'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedExperts = snapshot.docs.map(doc => ({
                id: doc.id, // Using real uid as id
                name: doc.data().name || "Unknown Expert",
                role: doc.data().qualification || "Agricultural Specialist",
                exp: "New",
                rating: 5.0,
                status: doc.data().status || "online",
                img: doc.data().name ? doc.data().name[0].toUpperCase() : "E",
                isImage: false,
                phone: doc.data().phone
            }));
            
            // Avoid duplicate IDs if same expert
            setExperts([...EXPERTS, ...fetchedExperts]);
        });
        return () => unsubscribe();
    }, []);

    // Listen to Farmer's Consultation Requests
    useEffect(() => {
        if (!currentUser) return;
        const q = query(collection(db, 'consultRequests'), where('farmerId', '==', currentUser.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const reqs = {};
            snapshot.docs.forEach(doc => {
                reqs[doc.data().expertId] = doc.data().status;
            });
            setRequests(reqs);
        });
        return () => unsubscribe();
    }, [currentUser]);

    // Listen to Messages if Chat is Active
    useEffect(() => {
        if (!currentChatId) return;
        const q = query(collection(db, 'chats', currentChatId, 'messages'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(msgs);
            
            // Check if expert unlocked calls (simulated via system message for now, or could be a field in chats)
            const unlockMsg = msgs.find(m => m.text.includes("unlocked the audio"));
            if (unlockMsg) setCallsUnlocked(true);
            else setCallsUnlocked(false);
        });
        return () => unsubscribe();
    }, [currentChatId]);

    // Timer for active calls
    useEffect(() => {
        let interval;
        if (callStatus === 'connected') {
            interval = setInterval(() => setCallDuration(prev => prev + 1), 1000);
        } else {
            setCallDuration(0);
        }
        return () => clearInterval(interval);
    }, [callStatus]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const [selectedRequestExpert, setSelectedRequestExpert] = useState(null);

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 4000);
    };

    const handleCardClick = (expert) => {
        if (!currentUser) {
            alert("Please login to request a consultation.");
            return;
        }

        if (requests[expert.id] === 'approved') {
            openChat(expert);
        } else if (requests[expert.id] === 'pending') {
            showToast("Your request is still pending approval.");
        } else {
            setSelectedRequestExpert(expert);
        }
    };

    const confirmRequest = async () => {
        if (!selectedRequestExpert || !currentUser) return;
        const expertId = selectedRequestExpert.id;
        const expertName = selectedRequestExpert.name;
        
        try {
            await addDoc(collection(db, 'consultRequests'), {
                farmerId: currentUser.uid,
                farmerName: userData?.name || "Farmer",
                expertId: expertId,
                expertName: expertName,
                issue: "General Crop Consultation",
                crop: "Unknown",
                status: "pending",
                createdAt: serverTimestamp()
            });

            setSelectedRequestExpert(null);
            showToast(`Request sent to ${expertName}.`);

            // WhatsApp Notification
            if (selectedRequestExpert.phone) {
                const text = `Hello ${expertName}, I have requested a consultation with you on Krishi AI regarding my crops.`;
                window.open(`https://wa.me/${selectedRequestExpert.phone}?text=${encodeURIComponent(text)}`, '_blank');
            }
        } catch (error) {
            console.error("Error creating request:", error);
            showToast("Failed to send request.");
        }
    };

    const openChat = async (expert) => {
        if (activeChat?.id === expert.id) return;

        setActiveChat(expert);
        setCallsUnlocked(false);
        setCurrentChatId(null);
        setMessages([]);

        // Find Chat ID
        const q = query(collection(db, 'chats'), where('farmerId', '==', currentUser.uid), where('expertId', '==', expert.id));
        const snap = await getDocs(q);
        if (!snap.empty) {
            setCurrentChatId(snap.docs[0].id);
        } else {
            console.error("Chat room not found despite approved status.");
        }
    };

    const closeChat = () => {
        setActiveChat(null);
        setCurrentChatId(null);
    };

    const sendMessage = async () => {
        if (!chatInput.trim() || !currentChatId || !currentUser) return;
        
        const userInput = chatInput.trim();
        setChatInput('');

        try {
            await addDoc(collection(db, 'chats', currentChatId, 'messages'), {
                senderId: currentUser.uid,
                senderRole: 'farmer',
                text: userInput,
                timestamp: serverTimestamp()
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleCallClick = (type) => {
        if (!callsUnlocked) {
            alert("Calls are locked. Please wait for the expert to initiate or allow calls.");
            return;
        }
        
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
        }, 1000);
    };

    return (
        <div className="consult-page container">
            <header className="page-header">
                <h1>Expert <span className="text-gradient">Consultation</span></h1>
                <p>Connect with top agricultural scientists and doctors.</p>
            </header>

            {/* Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div 
                        className="consult-toast glass"
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 20, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                    >
                        <ShieldCheck size={20} style={{color: '#00e676'}} />
                        <p>{toastMessage}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="experts-grid">
                {experts.map(expert => (
                    <div 
                        key={expert.id} 
                        className={`expert-card glass ${requests[expert.id] || ''}`}
                        onClick={() => handleCardClick(expert)}
                    >
                        <div className="expert-card-image">
                            {expert.isImage ? (
                                <img 
                                    src={expert.img} 
                                    alt={expert.name} 
                                    className="expert-photo-full" 
                                    style={expert.imgPos ? { objectPosition: expert.imgPos } : {}}
                                />
                            ) : (
                                <div className={`avatar-placeholder ${expert.status}`}>{expert.img}</div>
                            )}
                            {expert.status === 'online' && <div className="status-badge online">Online</div>}
                            {expert.status === 'busy' && <div className="status-badge busy">Busy</div>}
                        </div>
                        
                        <div className="expert-card-content">
                            <h3>{expert.name} <ShieldCheck size={16} className="verified" /></h3>
                            <p className="role">{expert.role}</p>
                            <div className="meta">
                                <span><Star size={14} className="star" /> {expert.rating}</span>
                                <span>• {expert.exp} Exp</span>
                            </div>
                            
                            {/* Status Indicator at bottom */}
                            {requests[expert.id] === 'pending' && (
                                <div className="request-status pending">
                                    <Loader2 className="spinner" size={16} /> Request Pending...
                                </div>
                            )}
                            {requests[expert.id] === 'approved' && (
                                <div className="request-status accepted">
                                    <MessageSquare size={16} /> Tap to Open Chat
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Request Confirmation Modal */}
            <AnimatePresence>
                {selectedRequestExpert && (
                    <motion.div
                        className="call-overlay glass"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="confirm-modal glass"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                        >
                            <h2>Request Consultation</h2>
                            <p>Would you like to request a consultation with <strong>{selectedRequestExpert.name}</strong>?</p>
                            
                            <div className="confirm-actions">
                                <button className="btn btn-outline" onClick={() => setSelectedRequestExpert(null)}>Cancel</button>
                                <button className="btn btn-primary" onClick={confirmRequest}>Confirm Request</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat & Call Modal Overlay */}
            <AnimatePresence>
                {activeChat && (
                    <motion.div
                        className="call-overlay glass"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                    >
                        {!activeCall ? (
                            // Chat Interface
                            <div className="chat-interface">
                                <div className="chat-header">
                                    <button className="back-btn" onClick={closeChat}><ArrowLeft size={20} /></button>
                                    <div className="chat-header-info">
                                        <div className={`avatar expert-sm ${activeChat.status}`}>
                                            {activeChat.isImage ? <img src={activeChat.img} alt={activeChat.name} className="expert-photo" style={activeChat.imgPos ? { objectPosition: activeChat.imgPos } : {}} /> : activeChat.img}
                                        </div>
                                        <div>
                                            <h3>{activeChat.name}</h3>
                                            <p>{activeChat.role}</p>
                                        </div>
                                    </div>
                                    <div className="chat-header-actions">
                                        <button 
                                            className={`call-btn ${callsUnlocked ? 'unlocked' : 'locked'}`}
                                            onClick={() => handleCallClick('audio')}
                                            title={callsUnlocked ? "Start Audio Call" : "Locked by Expert"}
                                        >
                                            <Phone size={18} />
                                            {!callsUnlocked && <Lock size={12} className="lock-icon" />}
                                        </button>
                                        <button 
                                            className={`call-btn ${callsUnlocked ? 'unlocked' : 'locked'}`}
                                            onClick={() => handleCallClick('video')}
                                            title={callsUnlocked ? "Start Video Call" : "Locked by Expert"}
                                        >
                                            <Video size={18} />
                                            {!callsUnlocked && <Lock size={12} className="lock-icon" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="chat-messages">
                                    {messages.map(msg => (
                                        <div key={msg.id} className={`message ${msg.senderRole === 'farmer' ? 'user' : 'expert'}`}>
                                            {msg.senderRole === 'system' ? (
                                                <div className="system-msg">{msg.text}</div>
                                            ) : (
                                                <div className="msg-bubble">{msg.text}</div>
                                            )}
                                        </div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>

                                <div className="chat-input-container">
                                    <input
                                        type="text"
                                        placeholder="Type your question..."
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    />
                                    <button className="btn btn-primary" onClick={sendMessage}>
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Audio/Video Call Interface (Same as before, adapted for new workflow)
                            <div className={`call-interface ${activeCall === 'video' ? 'video-mode' : 'audio-mode'}`}>
                                {activeCall === 'video' && callStatus === 'connected' && !isVideoOff && (
                                    <div className="video-feed simulated">
                                        <div className="remote-video">
                                            <div className="doctor-simulation">
                                                <div className="avatar expert-xl">
                                                    {activeChat.isImage ? <img src={activeChat.img} alt={activeChat.name} className="expert-photo" style={activeChat.imgPos ? { objectPosition: activeChat.imgPos } : {}} /> : activeChat.img}
                                                </div>
                                                <p>Dr. is on camera</p>
                                            </div>
                                        </div>
                                        <div className="local-video">You</div>
                                    </div>
                                )}

                                {(activeCall === 'audio' || isVideoOff || callStatus !== 'connected') && (
                                    <div className="call-avatar">
                                        <div className="avatar expert-xxl pulse-ring">
                                            {activeChat.isImage ? <img src={activeChat.img} alt={activeChat.name} className="expert-photo" style={activeChat.imgPos ? { objectPosition: activeChat.imgPos } : {}} /> : activeChat.img}
                                        </div>
                                    </div>
                                )}

                                <div className="call-info">
                                    <h2>{activeChat.name}</h2>
                                    <p className="status-text">
                                        {callStatus === 'connecting' && "Connecting..."}
                                        {callStatus === 'connected' && <span className="live-timer"><span className="live-dot">●</span> {formatTime(callDuration)}</span>}
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
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
