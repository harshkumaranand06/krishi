import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../context/ChatContext';
import './ChatBot.css';

const INITIAL_MESSAGES = [
    { id: 1, text: "Hello! I am Krishi Assistant. How can I help you today?", sender: 'bot' }
];

export default function ChatBot() {
    const { isOpen, closeChat, openChat } = useChat();
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        // Simulated AI Response (Local Knowledge Base)
        setTimeout(async () => {
            let replyText = "";

            // FUTURE: Add Gemini API call here if VITE_GEMINI_KEY exists
            // const geminiResponse = await fetchGemini(input);
            // if(geminiResponse) replyText = geminiResponse;

            if (!replyText) {
                const { getSmartResponse } = await import('../data/agriKnowledge');
                replyText = getSmartResponse(input);
            }

            const botMsg = { id: Date.now() + 1, text: replyText, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        }, 800);
    };

    return (
        <>
            <button
                className={`chatbot-toggle ${isOpen ? 'hidden' : ''}`}
                onClick={openChat}
            >
                <Bot size={28} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-window glass"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    >
                        <div className="chatbot-header">
                            <div className="bot-info">
                                <Bot size={20} />
                                <span>Krishi AI</span>
                            </div>
                            <button onClick={closeChat} className="close-btn">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="chatbot-messages">
                            {messages.map(msg => (
                                <div key={msg.id} className={`message ${msg.sender}`}>
                                    <div className="msg-bubble">
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSend} className="chatbot-input">
                            <input
                                type="text"
                                placeholder="Ask me anything..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button type="submit">
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
