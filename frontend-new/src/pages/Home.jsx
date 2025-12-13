import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scan, ArrowRight, Zap, Shield, Smartphone, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useChat } from '../context/ChatContext';
import './Home.css';

const HOME_TEXT = {
    en: {
        badge: "AI-Powered V2.0",
        title1: "Revolutionizing",
        title2: "Agriculture",
        subtitle: "Diagnose crop diseases in seconds using advanced Computer Vision. Get instant treatments, connect with experts, and secure your harvest.",
        ctaScan: "Start Diagnosis",
        ctaJoin: "Join Network",
        accuracy: "Accuracy",
        diseases: "Diseases",
        response: "Response Time",
        whyTitle: "Why Choose Krishi?",
        whySubtitle: "Built for the modern farmer.",
        features: [
            { title: "Instant Scan", desc: "Point your camera at any leaf. Our offline-capable AI identifies issues instantly." },
            { title: "Smart Remedies", desc: "Don't just diagnose. Get precise chemical and organic treatment plans." },
            { title: "Offline Mode", desc: "Works perfectly in remote fields with zero internet connectivity." },
            { title: "Community Verified", desc: "Diagnoses are double-checked by top agriculture experts in real-time." }
        ]
    },
    hi: {
        badge: "एआई-संचालित V2.0",
        title1: "कृषि में",
        title2: "नई क्रांति",
        subtitle: "एडवांस्ड कंप्यूटर विजन का उपयोग करके सेकंड में फसल रोगों का निदान करें। तुरंत उपचार पाएं, विशेषज्ञों से जुड़ें और अपनी फसल सुरक्षित करें।",
        ctaScan: "निदान शुरू करें",
        ctaJoin: "नेटवर्क से जुड़ें",
        accuracy: "सटीकता",
        diseases: "बीमारियां",
        response: "प्रतिक्रिया समय",
        whyTitle: "कृषि क्यों चुनें?",
        whySubtitle: "आधुनिक किसान के लिए बनाया गया।",
        features: [
            { title: "तेज़ स्कैन", desc: "किसी भी पत्ती पर अपना कैमरा दिखाएं। हमारा एआई तुरंत समस्याओं की पहचान करता है।" },
            { title: "स्मार्ट उपाय", desc: "सिर्फ निदान नहीं। सटीक रासायनिक और जैविक उपचार योजनाएं प्राप्त करें।" },
            { title: "ऑफलाइन मोड", desc: "बिना इंटरनेट कनेक्टिविटी के दूरदराज के खेतों में पूरी तरह से काम करता है।" },
            { title: "समुदाय सत्यापित", desc: "वास्तविक समय में शीर्ष कृषि विशेषज्ञों द्वारा निदान की दोबारा जांच की जाती है।" }
        ]
    },
    kn: {
        badge: "AI-ಚಾಲಿತ V2.0",
        title1: "ಕೃಷಿಯಲ್ಲಿ",
        title2: "ಹೊಸ ಕ್ರಾಂತಿ",
        subtitle: "ಸುಧಾರಿತ ಕಂಪ್ಯೂಟರ್ ವಿಷನ್ ಬಳಸಿ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಬೆಳೆ ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ. ತಕ್ಷಣದ ಚಿಕಿತ್ಸೆ ಪಡೆಯಿರಿ, ತಜ್ಞರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.",
        ctaScan: "ರೋಗನಿರ್ಣಯ ಪ್ರಾರಂಭಿಸಿ",
        ctaJoin: "ನೆಟ್‌ವರ್ಕ್ ಸೇರಿ",
        accuracy: "ನಿಖರತೆ",
        diseases: "ರೋಗಗಳು",
        response: "ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ",
        whyTitle: "ಕೃಷಿ ಆಯ್ಕೆ ಏಕೆ?",
        whySubtitle: "ಆಧುನಿಕ ರೈತರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.",
        features: [
            { title: "ತ್ವರಿತ ಸ್ಕ್ಯಾನ್", desc: "ಯಾವುದೇ ಎಲೆಯತ್ತ ಕ್ಯಾಮೆರಾ ಹಿಡಿಯಿರಿ. ನಮ್ಮ AI ತಕ್ಷಣ ಸಮಸ್ಯೆ ಗುರುತಿಸುತ್ತದೆ." },
            { title: "ಸ್ಮಾರ್ಟ್ ಪರಿಹಾರಗಳು", desc: "ಕೇವಲ ರೋಗನಿರ್ಣಯವಲ್ಲ. ನಿಖರವಾದ ರಾಸಾಯನಿಕ ಮತ್ತು ಸಾವಯವ ಚಿಕಿತ್ಸಾ ಯೋಜನೆ ಪಡೆಯಿರಿ." },
            { title: "ಆಫ್‌ಲೈನ್ ಮೋಡ್", desc: "ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದಿದ್ದರೂ ದೂರದ ಜಮೀನುಗಳಲ್ಲಿ ಸಂಪೂರ್ಣವಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ." },
            { title: "ಸಮುದಾಯ ಪರಿಶೀಲಿತ", desc: "ರೋಗನಿರ್ಣಯಗಳನ್ನು ಕೃಷಿ ತಜ್ಞರು ನೈಜ ಸಮಯದಲ್ಲಿ ಪರಿಶೀಲಿಸುತ್ತಾರೆ." }
        ]
    }
};

export default function Home() {
    const { lang } = useLanguage();
    const { openChat } = useChat();
    // Fallback to English
    const t = HOME_TEXT[lang] || HOME_TEXT['en'];

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const stagger = {
        visible: { transition: { staggerChildren: 0.2 } }
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg-glow"></div>
                <motion.div
                    className="container hero-content"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    <motion.div variants={fadeInUp} className="hero-badge">
                        <Zap size={16} /> {t.badge}
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="hero-title">
                        {t.title1} <br />
                        <span className="text-gradient">{t.title2}</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="hero-subtitle">
                        {t.subtitle}
                    </motion.p>

                    <motion.div variants={fadeInUp} className="hero-cta">
                        <Link to="/scan" className="btn btn-primary">
                            {t.ctaScan} <Scan size={20} />
                        </Link>
                        <Link to="/community" className="btn btn-glass">
                            {t.ctaJoin} <ArrowRight size={20} />
                        </Link>
                        <Link to="/consult" className="btn btn-glass">
                            <Smartphone size={20} /> {lang === 'en' ? 'Consult Expert' : lang === 'hi' ? 'विशेषज्ञ सलाह' : 'ತಜ್ಞರ ಸಲಹೆ'}
                        </Link>
                        <button onClick={openChat} className="btn btn-primary-outline">
                            <Zap size={20} /> {lang === 'en' ? 'Ask AI' : lang === 'hi' ? 'एआई से पूछें' : 'AI ಕೇಳಿ'}
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* How it Works / Stats */}
            <section className="stats-section container">
                <div className="stats-grid">
                    <StatCard number="98%" label={t.accuracy} />
                    <StatCard number="50k+" label={t.diseases} />
                    <StatCard number="2s" label={t.response} />
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section container">
                <div className="section-header">
                    <h2>{t.whyTitle}</h2>
                    <p>{t.whySubtitle}</p>
                </div>

                <div className="features-grid">
                    <FeatureCard
                        icon={<Scan />}
                        title={t.features[0].title}
                        desc={t.features[0].desc}
                    />
                    <FeatureCard
                        icon={<Activity />}
                        title={t.features[1].title}
                        desc={t.features[1].desc}
                    />
                    <FeatureCard
                        icon={<Smartphone />}
                        title={t.features[2].title}
                        desc={t.features[2].desc}
                    />
                    <FeatureCard
                        icon={<Shield />}
                        title={t.features[3].title}
                        desc={t.features[3].desc}
                    />
                </div>
            </section>
        </div>
    );
}

function StatCard({ number, label }) {
    return (
        <div className="stat-card glass-card">
            <h3 className="text-gradient">{number}</h3>
            <p>{label}</p>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="feature-card glass-card">
            <div className="feature-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    );
}
