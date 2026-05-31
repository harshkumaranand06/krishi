import React, { useState, useRef } from 'react';
import { Upload, Camera, X, Activity, Droplet, Sprout, AlertTriangle, CheckCircle, Globe, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import './Scan.css';

const TRANSLATIONS = {
    en: {
        title: "Upload Leaf Image",
        subtitle: "Point your camera at the affected crop.",
        uploadBtn: "Select Image",
        analyzeBtn: "Analyze Disease",
        cancelBtn: "Cancel",
        scanAnother: "Scan Another",
        about: "About the Disease",
        harmful: "Harmful Effects",
        economic: "Economic Impact",
        immediate: "Immediate Action",
        doctor: "Expert Advice",
        treatments: "Recommended Treatments",
        precautions: "Preventive Measures",
        critical: "Critical Issue",
        confidence: "Confidence",
        listenSummary: "Listen to Summary",
        stopAudio: "Stop Audio",
        networkOnline: "Network Status: Online",
        networkOffline: "Network Status: Offline",
        modelOfflineReady: "Offline Ready ⚡",
        modelNotLoaded: "Offline scan not loaded. Download recommended (13.5MB).",
        downloadModelBtn: "Download Offline Model",
        downloadingModel: "Downloading offline model...",
        offlineInferenceBadge: "Offline Local Scan"
    },
    hi: {
        title: "पत्ती की फोटो अपलोड करें",
        subtitle: "अपने कैमरे को प्रभावित फसल की ओर दिखाएं।",
        uploadBtn: "फोटो चुनें",
        analyzeBtn: "रोग की पहचान करें",
        cancelBtn: "रद्द करें",
        scanAnother: "दूसरा स्कैन करें",
        about: "रोग के बारे में",
        harmful: "हानिकारक प्रभाव",
        economic: "आर्थिक प्रभाव",
        immediate: "तत्काल कार्रवाई",
        doctor: "विशेषज्ञ सलाह",
        treatments: "सुझाए गए उपचार",
        precautions: "बचाव के उपाय",
        critical: "गंभीर समस्या",
        confidence: "सटीकता",
        listenSummary: "सारांश सुनें",
        stopAudio: "ऑडियो बंद करें",
        networkOnline: "नेटवर्क: ऑनलाइन",
        networkOffline: "नेटवर्क: ऑफलाइन",
        modelOfflineReady: "ऑफ़लाइन स्कैन तैयार ⚡",
        modelNotLoaded: "ऑफ़लाइन स्कैन लोड नहीं है। डाउनलोड करें (13.5MB)।",
        downloadModelBtn: "ऑफ़लाइन मॉडल डाउनलोड करें",
        downloadingModel: "ऑफ़लाइन मॉडल डाउनलोड हो रहा है...",
        offlineInferenceBadge: "ऑफ़लाइन स्थानीय स्कैन"
    },
    kn: {
        title: "ಎಲೆ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
        subtitle: "ನಿಮ್ಮ ಕ್ಯಾಮರಾವನ್ನು ಬಾಧಿತ ಬೆಳೆಯ ಕಡೆಗೆ ಗುರಿಮಾಡಿ.",
        uploadBtn: "ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        analyzeBtn: "ರೋಗವನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
        cancelBtn: "ರದ್ದುಮಾಡಿ",
        scanAnother: "ಮತ್ತೊಂದು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
        about: "ರೋಗದ ಬಗ್ಗೆ",
        harmful: "ಹಾನಿಕಾರಕ ಪರಿಣಾಮಗಳು",
        economic: "ಆರ್ಥಿಕ ಪರಿಣಾಮ",
        immediate: "ತಕ್ಷಣದ ಕ್ರಮ",
        doctor: "ತಜ್ಞರ ಸಲಹೆ",
        treatments: "ಶಿಫಾರಸು ಮಾಡಿದ ಚಿಕಿತ್ಸೆಗಳು",
        precautions: "ಮುನ್ನೆಚ್ಚರಿಕೆ ಕ್ರಮಗಳು",
        critical: "ಗಂಭೀರ ಸಮಸ್ಯೆ",
        confidence: "ವಿಶ್ವಾಸಾರ್ಹತೆ",
        listenSummary: "ಸಾರಾಂಶವನ್ನು ಕೇಳಿ",
        stopAudio: "ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ",
        networkOnline: "ನೆಟ್‌ವರ್ಕ್: ಆನ್‌ಲೈನ್",
        networkOffline: "ನೆಟ್‌ವರ್ಕ್: ಆಫ್‌ಲೈನ್",
        modelOfflineReady: "ಆಫ್‌ಲೈನ್ ಸಿದ್ಧವಾಗಿದೆ ⚡",
        modelNotLoaded: "ಆಫ್‌ಲೈನ್ ಸ್ಕ್ಯಾನ್ ಲೋಡ್ ಆಗಿಲ್ಲ. ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ (13.5MB).",
        downloadModelBtn: "ಆಫ್‌ಲೈನ್ ಮಾಡೆಲ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
        downloadingModel: "ಆಫ್‌ಲೈನ್ ಮಾಡೆಲ್ ಡೌನ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
        offlineInferenceBadge: "ಆಫ್‌ಲೈನ್ ಸ್ಥಳೀಯ ಸ್ಕ್ಯಾನ್"
    }
};

export default function Scan() {
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("");
    const [showInvalidPopup, setShowInvalidPopup] = useState(false); // New state for popup
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    
    // Offline capabilities states
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [modelState, setModelState] = useState('unloaded'); // 'unloaded', 'downloading', 'ready', 'error'
    const [downloadProgress, setDownloadProgress] = useState(0);

    const { lang } = useLanguage();
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    // Auto check cache and add network listeners
    React.useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        const checkCache = async () => {
            try {
                const { isModelCached } = await import('../utils/tfjsModel');
                const cached = await isModelCached();
                if (cached) {
                    setModelState('ready');
                }
            } catch (err) {
                console.error("Error checking model cache:", err);
            }
        };

        checkCache();

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const downloadOfflineModel = async () => {
        setModelState('downloading');
        setDownloadProgress(0);
        try {
            const { loadTFJSModel } = await import('../utils/tfjsModel');
            await loadTFJSModel((progress) => {
                setDownloadProgress(progress);
            });
            setModelState('ready');
        } catch (err) {
            console.error("Failed to download model:", err);
            setModelState('error');
        }
    };

    // Fallback to English if translation missing
    const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setResult(null);
                setShowInvalidPopup(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCameraCapture = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName('camera_capture.jpg');
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setResult(null);
                setShowInvalidPopup(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const ML_API_URL = 'http://localhost:8000/predict';

    const startDiagnosis = async () => {
        setIsScanning(true);

        const { DISEASE_DATA } = await import('../data/plantDiseases');

        // ── Helper: build result object from disease key + confidence ──
        const buildResult = (diseaseKey, confidence) => {
            const data = (DISEASE_DATA[diseaseKey]?.[lang])
                      || (DISEASE_DATA[diseaseKey]?.['en'])
                      || DISEASE_DATA['tomato_early_blight']['en'];
            return {
                disease:        data.disease,
                confidence:     Math.round(confidence),
                healthy:        diseaseKey === 'healthy',
                description:    data.description,
                harmful_effect: data.harmful_effect,
                economic_impact:data.economic_impact,
                immediate_action:data.immediate_action,
                doctor_advice:  data.doctor_advice,
                precautions:    data.precautions,
                treatments:     data.treatments
            };
        };

        // ── PATH A: Call the real PlantVillage ML API ─────────────────
        try {
            // Convert base64 image string → Blob → FormData
            const res      = await fetch(image);
            const blob     = await res.blob();
            const formData = new FormData();
            formData.append('file', blob, fileName || 'leaf.jpg');

            const apiRes  = await fetch(ML_API_URL, {
                method:  'POST',
                body:    formData,
                signal:  AbortSignal.timeout(15000)   // 15s timeout
            });

            if (!apiRes.ok) throw new Error(`ML API error: ${apiRes.status}`);

            const prediction = await apiRes.json();

            // Check if model thinks it's not a plant (very low confidence)
            if (prediction.confidence < 0.30) {
                setIsScanning(false);
                setShowInvalidPopup(true);
                return;
            }

            console.log(`✅ ML API: ${prediction.class_name} (${(prediction.confidence * 100).toFixed(1)}%)`);
            setResult(buildResult(prediction.disease_key, prediction.confidence * 100));
            setIsScanning(false);
            return;

        } catch (err) {
            // ML server not running → fall back to offline method
            console.warn('⚠️ ML API unavailable, attempting offline TF.js inference:', err.message);
        }

        // ── PATH B: Real Browser-Side Offline TF.JS Inference ───────────
        try {
            const { isModelCached, loadTFJSModel, runLocalInference } = await import('../utils/tfjsModel');
            const isCached = await isModelCached();

            if (isCached || modelState === 'ready') {
                console.log('⚡ Running browser-side local offline TF.js inference...');

                // Ensure model is loaded in memory
                await loadTFJSModel();

                // Load base64 image into HTML Image object for canvas extraction
                const imgEl = new Image();
                imgEl.src = image;
                await new Promise((resolve, reject) => {
                    imgEl.onload = resolve;
                    imgEl.onerror = (e) => reject(new Error('Failed to load image element for TF.js'));
                });

                const prediction = await runLocalInference(imgEl);

                if (prediction.confidence < 0.30) {
                    setIsScanning(false);
                    setShowInvalidPopup(true);
                    return;
                }

                console.log(`✅ TF.js Browser Prediction: ${prediction.class_name} (${(prediction.confidence * 100).toFixed(1)}%)`);

                // Construct result structure with an extra flag showing it was processed locally
                const resObj = buildResult(prediction.disease_key, prediction.confidence * 100);
                resObj.is_local = true;
                resObj.inference_time_ms = prediction.inference_time_ms;
                resObj.raw_class = prediction.class_name;
                resObj.top3 = prediction.top3;

                setResult(resObj);
                setIsScanning(false);
                return;
            }
        } catch (localErr) {
            console.error('❌ TF.js browser inference failed:', localErr);
        }

        // ── PATH C: Offline fallback (hash-based) ─────────────────────
        await new Promise(r => setTimeout(r, 2000)); // Simulate processing
        const { analyzeDiseases } = await import('../data/plantDiseases');
        const analysis = analyzeDiseases(image, fileName);

        if (analysis.key === 'not_plant') {
            setIsScanning(false);
            setShowInvalidPopup(true);
            return;
        }

        setResult(buildResult(analysis.key, analysis.confidence));
        setIsScanning(false);
    };

    const resetScan = () => {
        // Stop any ongoing speech
        if (isSpeaking) {
            stopVoiceSummary();
        }
        setImage(null);
        setResult(null);
        setShowInvalidPopup(false);
        setIsScanning(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const playVoiceSummary = async () => {
        if (!result) return;

        try {
            const { speak, getSpeechLang, createVoiceSummary } = await import('../utils/textToSpeech');
            const summaryText = createVoiceSummary(result, lang);
            const speechLang = getSpeechLang(lang);

            setIsSpeaking(true);
            speak(summaryText, speechLang, () => {
                setIsSpeaking(false);
            });
        } catch (error) {
            console.error('Voice summary error:', error);
            setIsSpeaking(false);
        }
    };

    const stopVoiceSummary = async () => {
        try {
            const { stopSpeaking } = await import('../utils/textToSpeech');
            stopSpeaking();
            setIsSpeaking(false);
        } catch (error) {
            console.error('Error stopping voice:', error);
        }
    };

    return (
        <div className="scan-page container">
            <div className="scan-content">
                {!image ? (
                    <motion.div
                        className="upload-zone glass"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="upload-icon-wrapper">
                            <Camera size={64} className="upload-icon" />
                        </div>
                        <h2>{t.title}</h2>
                        <p>{t.subtitle}</p>

                        {/* Offline Capabilities Card */}
                        <div className="offline-control-card glass-panel" style={{
                            margin: '2rem auto',
                            maxWidth: '500px',
                            padding: '1.25rem',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Globe size={16} style={{ color: isOnline ? '#00e676' : '#fbbf24' }} />
                                    {isOnline ? t.networkOnline : t.networkOffline}
                                </span>
                                {modelState === 'ready' ? (
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        background: 'rgba(0, 230, 118, 0.1)',
                                        color: '#00e676',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: '700'
                                    }}>
                                        <CheckCircle size={14} /> {t.modelOfflineReady}
                                    </span>
                                ) : (
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        background: 'rgba(251, 191, 36, 0.1)',
                                        color: '#fbbf24',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: '700'
                                    }}>
                                        ⚠️ Offline Disabled
                                    </span>
                                )}
                            </div>

                            {modelState === 'unloaded' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.4' }}>
                                        {t.modelNotLoaded}
                                    </p>
                                    <button 
                                        onClick={downloadOfflineModel}
                                        className="btn btn-secondary btn-sm"
                                        style={{ 
                                            alignSelf: 'flex-start',
                                            padding: '0.5rem 1rem',
                                            fontSize: '0.85rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: '#fff',
                                            borderRadius: '6px'
                                        }}
                                    >
                                        <Upload size={14} style={{ transform: 'rotate(180deg)' }} />
                                        {t.downloadModelBtn}
                                    </button>
                                </div>
                            )}

                            {modelState === 'downloading' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                                        <span>{t.downloadingModel}</span>
                                        <span style={{ fontWeight: '700', color: '#00e676' }}>{downloadProgress}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ width: `${downloadProgress}%`, height: '100%', background: '#00e676', borderRadius: '3px', transition: 'width 0.1s ease' }} />
                                    </div>
                                </div>
                            )}

                            {modelState === 'ready' && (
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(0, 230, 118, 0.7)', lineHeight: '1.4' }}>
                                    Model is securely saved in your browser storage (IndexedDB). You can safely close your connection and scan leaves in the fields completely offline!
                                </p>
                            )}

                            {modelState === 'error' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#ff5555', lineHeight: '1.4' }}>
                                        Failed to download the local model. Please verify your connection or serve the TF.js model files from the public folder.
                                    </p>
                                    <button 
                                        onClick={downloadOfflineModel}
                                        className="btn btn-secondary btn-sm"
                                        style={{ 
                                            alignSelf: 'flex-start',
                                            padding: '0.5rem 1rem',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: '#fff',
                                            borderRadius: '6px'
                                        }}
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden-input"
                            ref={fileInputRef}
                            id="file-upload"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleCameraCapture}
                            className="hidden-input"
                            ref={cameraInputRef}
                            id="camera-capture"
                        />
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <label htmlFor="camera-capture" className="btn btn-primary upload-btn">
                                <Camera size={20} /> {t.cameraBtn || 'Take Photo'}
                            </label>
                            <label htmlFor="file-upload" className="btn btn-secondary upload-btn">
                                <Upload size={20} /> {t.uploadBtn}
                            </label>
                        </div>
                    </motion.div>
                ) : (
                    <div className="analysis-container">
                        <div className="image-preview-wrapper glass">
                            <img src={image} alt="Crop" className="preview-image" />
                            {isScanning && (
                                <div className="scanning-overlay">
                                    <div className="scan-line"></div>
                                    <div className="scan-grid"></div>
                                </div>
                            )}

                            {!isScanning && !result && !showInvalidPopup && (
                                <div className="preview-actions">
                                    <button onClick={startDiagnosis} className="btn btn-primary pulse-btn">
                                        <Activity size={20} /> {t.analyzeBtn}
                                    </button>
                                    <button onClick={resetScan} className="btn btn-glass">
                                        <X size={20} /> {t.cancelBtn}
                                    </button>
                                </div>
                            )}
                        </div>

                        <AnimatePresence>
                            {result && (
                                <motion.div
                                    className="result-card glass"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <div className="result-header">
                                        <div className="confidence-ring">
                                            <svg viewBox="0 0 36 36" className="circular-chart">
                                                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                <path className="circle" strokeDasharray={`${result.confidence}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                            </svg>
                                            <span className="percentage">{result.confidence}%</span>
                                        </div>
                                        <div className="disease-info">
                                            <h3>{result.disease}</h3>
                                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                                                <span className="badge-danger"><AlertTriangle size={14} /> {t.critical}</span>
                                                {result.is_local && (
                                                    <span style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '0.3rem',
                                                        background: 'rgba(96, 165, 250, 0.15)',
                                                        color: '#60a5fa',
                                                        padding: '0.2rem 0.6rem',
                                                        border: '1px solid rgba(96, 165, 250, 0.25)',
                                                        borderRadius: '4px',
                                                        fontSize: '0.8rem',
                                                        fontWeight: '600'
                                                    }}>
                                                        ⚡ {t.offlineInferenceBadge} ({result.inference_time_ms}ms)
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Voice Summary Button */}
                                        <button
                                            onClick={isSpeaking ? stopVoiceSummary : playVoiceSummary}
                                            className={`btn ${isSpeaking ? 'btn-danger' : 'btn-secondary'}`}
                                            style={{
                                                marginLeft: 'auto',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.75rem 1.25rem',
                                                fontSize: '0.95rem',
                                                fontWeight: '600',
                                                animation: isSpeaking ? 'pulse 2s infinite' : 'none'
                                            }}
                                            title={isSpeaking ? t.stopAudio : t.listenSummary}
                                        >
                                            {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                            {isSpeaking ? t.stopAudio : t.listenSummary}
                                        </button>
                                    </div>

                                    <div className="diagnosis-details glass-panel">
                                        <h4>{t.about}</h4>
                                        <p>{result.description}</p>

                                        <div style={{ marginTop: '1.5rem' }}>
                                            <h4 style={{ color: '#ff5555', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t.harmful}</h4>
                                            <p>{result.harmful_effect}</p>
                                        </div>

                                        <div style={{ marginTop: '1.5rem' }}>
                                            <h4 style={{ color: '#fbbf24', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t.economic}</h4>
                                            <p>{result.economic_impact}</p>
                                        </div>

                                        <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                                            <h4 style={{ color: '#60a5fa' }}>{t.immediate}</h4>
                                            <p>{result.immediate_action}</p>
                                        </div>

                                        <div style={{ marginTop: '1rem', background: 'rgba(96, 165, 250, 0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #60a5fa' }}>
                                            <strong>{t.doctor}: </strong> {result.doctor_advice}
                                        </div>
                                    </div>

                                    <div className="treatments-section">
                                        <h4>{t.treatments}</h4>
                                        <div className="treatment-list">
                                            {result.treatments.map((t, i) => (
                                                <div key={i} className="treatment-item">
                                                    <div className="t-icon"><t.icon size={18} /></div>
                                                    <div className="t-info">
                                                        <h5>{t.type}</h5>
                                                        <p>{t.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="precautions-section">
                                        <h4><CheckCircle size={18} /> {t.precautions}</h4>
                                        <ul className="precautions-list">
                                            {result.precautions.map((p, i) => (
                                                <li key={i}>{p}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Developer Diagnostics Box */}
                                    {result.is_local && result.top3 && (
                                        <div className="glass-panel" style={{
                                            margin: '1.5rem 0',
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            fontSize: '0.85rem',
                                            textAlign: 'left'
                                        }}>
                                            <h5 style={{ margin: '0 0 0.5rem 0', color: '#ffc107', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
                                                🛠️ Developer Diagnostics (Model Output)
                                            </h5>
                                            <p style={{ margin: '0 0 0.5rem 0', color: 'rgba(255,255,255,0.6)' }}>
                                                The local model output has 6 classes. Below are the raw nodes and confidences predicted by the browser:
                                            </p>
                                            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'rgba(255,255,255,0.8)' }}>
                                                {result.top3.map((pred, idx) => (
                                                    <li key={idx} style={{ marginBottom: '0.5rem' }}>
                                                        Node <strong>Index {pred.index}</strong>: <span style={{ color: '#00e676', fontWeight: 'bold' }}>{(pred.confidence * 100).toFixed(2)}%</span>
                                                        <br />
                                                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                                                            Fallback class name: "{pred.class}" (maps to key: "{pred.disease_key}")
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <button onClick={resetScan} className="btn btn-glass full-width">
                                        {t.scanAnother}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Invalid Plant Popup */}
                        <AnimatePresence>
                            {showInvalidPopup && (
                                <div style={{
                                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                                    animation: 'fadeIn 0.3s ease'
                                }}>
                                    <div className="glass-panel" style={{
                                        maxWidth: '400px', width: '90%', textAlign: 'center', padding: '2rem',
                                        border: '1px solid rgba(239, 68, 68, 0.3)', boxShadow: '0 0 50px rgba(239, 68, 68, 0.2)'
                                    }}>
                                        <div style={{
                                            width: '80px', height: '80px', margin: '0 auto 1.5rem', background: 'rgba(239, 68, 68, 0.1)',
                                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <h1 style={{ fontSize: '3rem', margin: 0 }}>🌱🚫</h1>
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Not a Leaf?</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
                                            We could not identify a plant in this image. Please upload a clear photo of a crop leaf for diagnosis.
                                        </p>
                                        <button
                                            onClick={() => { setShowInvalidPopup(false); setImage(null); setFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                                            className="scan-btn"
                                            style={{ width: '100%', padding: '1rem', background: '#ef4444', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
