import React, { useState, useRef, useEffect } from 'react';
import { User, MessageSquare, CheckCircle, XCircle, ArrowLeft, ShieldCheck, Lock, Unlock, Phone, Video, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { db } from '../utils/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, addDoc, getDocs, serverTimestamp, orderBy } from 'firebase/firestore';
import './ExpertDashboard.css';

export default function ExpertDashboard() {
    const { currentUser } = useAuth();
    const [requests, setRequests] = useState([]);
    const [activeChat, setActiveChat] = useState(null); // Farmer object
    const [currentChatId, setCurrentChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [callsUnlocked, setCallsUnlocked] = useState(false);
    
    const chatEndRef = useRef(null);

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, activeChat]);

    // Listen to Consult Requests for this Expert
    useEffect(() => {
        if (!currentUser) return;
        const q = query(collection(db, 'consultRequests'), where('expertId', '==', currentUser.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const reqs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
        });
        return () => unsubscribe();
    }, [currentChatId]);

    const handleAccept = async (reqId, farmerId) => {
        try {
            // Update request status
            await updateDoc(doc(db, 'consultRequests', reqId), { status: 'approved' });
            
            // Check if chat room already exists
            const q = query(collection(db, 'chats'), where('farmerId', '==', farmerId), where('expertId', '==', currentUser.uid));
            const snap = await getDocs(q);
            
            let chatId;
            if (snap.empty) {
                const newChat = await addDoc(collection(db, 'chats'), {
                    farmerId: farmerId,
                    expertId: currentUser.uid,
                    active: true,
                    createdAt: serverTimestamp()
                });
                chatId = newChat.id;
            } else {
                chatId = snap.docs[0].id;
            }

            // Send initial system message
            await addDoc(collection(db, 'chats', chatId, 'messages'), {
                senderId: 'system',
                senderRole: 'system',
                text: 'Consultation request approved. You can now chat.',
                timestamp: serverTimestamp()
            });
        } catch (error) {
            console.error("Error accepting request:", error);
        }
    };

    const handleDecline = async (reqId) => {
        try {
            await updateDoc(doc(db, 'consultRequests', reqId), { status: 'declined' });
        } catch (error) {
            console.error("Error declining request:", error);
        }
    };

    const openChat = async (req) => {
        if (activeChat?.id === req.id) return; // Already open

        setActiveChat(req);
        setCallsUnlocked(false);
        setCurrentChatId(null); // Force useEffect to re-run
        setMessages([]);

        const q = query(collection(db, 'chats'), where('farmerId', '==', req.farmerId), where('expertId', '==', currentUser.uid));
        const snap = await getDocs(q);
        if (!snap.empty) {
            setCurrentChatId(snap.docs[0].id);
        }
    };

    const closeChat = () => {
        setActiveChat(null);
        setCurrentChatId(null);
    };

    const sendMessage = async () => {
        if (!chatInput.trim() || !activeChat || !currentChatId) return;
        
        const userInput = chatInput.trim();
        setChatInput('');

        try {
            await addDoc(collection(db, 'chats', currentChatId, 'messages'), {
                senderId: currentUser.uid,
                senderRole: 'expert',
                text: userInput,
                timestamp: serverTimestamp()
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const toggleCallLock = async () => {
        if (!currentChatId) return;
        const newLockState = !callsUnlocked;
        setCallsUnlocked(newLockState);
        
        const msg = newLockState ? "I have unlocked the audio/video calls. You can call me now." : "I have locked the calls again.";
        
        try {
            await addDoc(collection(db, 'chats', currentChatId, 'messages'), {
                senderId: 'system',
                senderRole: 'system',
                text: msg,
                timestamp: serverTimestamp()
            });
        } catch (error) {
            console.error("Error toggling call lock:", error);
        }
    };

    const pendingRequests = requests.filter(req => req.status === 'pending');
    const acceptedRequests = requests.filter(req => req.status === 'approved');

    return (
        <div className="expert-dashboard container">
            <header className="dashboard-header">
                <h1>Expert <span className="text-gradient">Dashboard</span></h1>
                <p>Manage your consultations and assist farmers.</p>
            </header>

            <div className="dashboard-content">
                {/* Left Column: Incoming Requests */}
                <div className="requests-section">
                    <h2>Incoming Requests</h2>
                    {pendingRequests.length === 0 ? (
                        <div className="empty-state glass">No pending requests right now.</div>
                    ) : (
                        <div className="requests-list">
                            {pendingRequests.map(req => (
                                <div key={req.id} className="request-card glass">
                                    <div className="req-info">
                                        <div className="avatar expert-sm online">{req.img}</div>
                                        <div>
                                            <h3>{req.name}</h3>
                                            <p className="req-meta">{req.location} • {req.crop}</p>
                                            <p className="req-issue">Issue: {req.issue}</p>
                                        </div>
                                    </div>
                                    <div className="req-actions">
                                        <button className="btn btn-primary btn-sm" onClick={() => handleAccept(req.id, req.farmerId)}>
                                            <CheckCircle size={16} /> Accept
                                        </button>
                                        <button className="btn btn-outline btn-sm decline" onClick={() => handleDecline(req.id)}>
                                            <XCircle size={16} /> Decline
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <h2 className="mt-4">Active Consultations</h2>
                    {acceptedRequests.length === 0 ? (
                        <div className="empty-state glass">You haven't accepted any requests yet.</div>
                    ) : (
                        <div className="requests-list">
                            {acceptedRequests.map(req => (
                                <div key={req.id} className="request-card glass accepted-card" onClick={() => openChat(req)}>
                                    <div className="req-info">
                                        <div className="avatar expert-sm online">{req.farmerName?.[0] || 'F'}</div>
                                        <div>
                                            <h3>{req.farmerName || 'Farmer'}</h3>
                                            <p className="req-meta">{req.crop || 'Crop'} • {req.issue}</p>
                                        </div>
                                    </div>
                                    <button className="btn btn-outline btn-sm">
                                        <MessageSquare size={16} /> Chat
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Chat Interface (if active) */}
                <div className="chat-section">
                    {activeChat ? (
                        <div className="chat-interface glass">
                            <div className="chat-header">
                                <div className="chat-header-info">
                                    <div className="avatar expert-sm online">{activeChat.farmerName?.[0] || 'F'}</div>
                                    <div>
                                        <h3>{activeChat.farmerName || 'Farmer'}</h3>
                                        <p>{activeChat.crop || 'Crop'} Farmer</p>
                                    </div>
                                </div>
                                <div className="chat-header-actions">
                                    <button 
                                        className={`call-btn ${callsUnlocked ? 'unlocked' : 'locked'}`}
                                        onClick={toggleCallLock}
                                        title="Toggle Call Permission for Farmer"
                                    >
                                        {callsUnlocked ? <Unlock size={18} /> : <Lock size={18} />}
                                    </button>
                                    <button className="back-btn mobile-only" onClick={closeChat}><ArrowLeft size={20} /></button>
                                </div>
                            </div>

                            <div className="chat-messages">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`message ${msg.senderRole === 'expert' ? 'user' : 'expert'}`}>
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
                                    placeholder="Type your advice..."
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
                        <div className="empty-chat glass">
                            <MessageSquare size={48} className="empty-icon" />
                            <h3>Select a Consultation</h3>
                            <p>Accept a request or click on an active consultation to start chatting.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
