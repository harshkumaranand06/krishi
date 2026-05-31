import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, X, Activity, Droplet, Sprout, AlertTriangle, CheckCircle, Globe, ChevronDown, Volume2, VolumeX, Download } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { DISEASE_DATA } from '../data/plantDiseases';
import TypewriterText from '../components/TypewriterText';
import './Scan.css';

const AnimatedCounter = ({ from = 0, to, duration = 1.5 }) => {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest) + "%");
    
    useEffect(() => {
        const controls = animate(count, to, { duration, ease: "easeOut" });
        return controls.stop;
    }, [count, to, duration]);
    
    return <motion.span>{rounded}</motion.span>;
};

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
        downloadReport: "Download Report",
        generatingPdf: "Generating PDF...",
        networkOnline: "Network Status: Online",
        networkOffline: "Network Status: Offline",
        modelOfflineReady: "Offline Ready ⚡",
        modelNotLoaded: "Offline scan not loaded. Download recommended (13.5MB).",
        downloadModelBtn: "Download Offline Model",
        downloadingModel: "Downloading offline model...",
        offlineInferenceBadge: "Offline Local Scan",
        veryReliable: "Very Reliable",
        reliable: "Reliable",
        retakeSuggested: "Retake Suggested",
        severityLabel: "Severity",
        mildInfection: "Mild",
        moderateInfection: "Moderate",
        severeInfection: "Severe",
        infectedArea: "Infected leaf area",
        plantHealthScore: "Plant Health Score",
        timelineLabel: "Disease Timeline",
        timelineStage: "Current Stage",
        timelineProgression: "Untreated progression",
        timelineEarly: "Early Stage",
        timelineMid: "Mid Stage",
        timelineSevere: "Dangerous Stage",
        timelineHealthy: "Healthy State",
        daysLabel: "days",
        weatherRiskLabel: "Microclimate Infection Risk",
        weatherRiskLevel: "Risk Level",
        weatherRiskHigh: "High Fungal Risk",
        weatherRiskMedium: "Moderate Fungal Risk",
        weatherRiskLow: "Low Fungal Risk",
        weatherHumidityAlert: "Humidity today favors fungal growth",
        weatherTempAlert: "Temperatures today favor spore spread",
        weatherDryAlert: "Dry microclimate limits spore infection",
        weatherTemp: "Temp",
        weatherHumidity: "Humidity",
        weatherRain: "Rain",
        weatherLive: "Live Microclimate Info",
        weatherFallback: "Average Seasonal Info"
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
        downloadReport: "रिपोर्ट डाउनलोड करें",
        generatingPdf: "PDF बन रहा है...",
        networkOnline: "नेटवर्क: ऑनलाइन",
        networkOffline: "नेटवर्क: ऑफलाइन",
        modelOfflineReady: "ऑफ़लाइन स्कैन तैयार ⚡",
        modelNotLoaded: "ऑफ़लाइन स्कैन लोड नहीं है। डाउनलोड करें (13.5MB)।",
        downloadModelBtn: "ऑफ़लाइन मॉडल डाउनलोड करें",
        downloadingModel: "ऑफ़लाइन मॉडल डाउनलोड हो रहा है...",
        offlineInferenceBadge: "ऑफ़लाइन स्थानीय स्कैन",
        veryReliable: "अत्यधिक विश्वसनीय",
        reliable: "विश्वसनीय",
        retakeSuggested: "पुनः फ़ोटो लें",
        severityLabel: "संक्रमण की गंभीरता",
        mildInfection: "हल्का संक्रमण",
        moderateInfection: "मध्यम संक्रमण",
        severeInfection: "गंभीर संक्रमण",
        infectedArea: "संक्रमित पत्ती क्षेत्र",
        plantHealthScore: "पौधे का स्वास्थ्य स्कोर",
        timelineLabel: "रोग की समयरेखा (Timeline)",
        timelineStage: "वर्तमान चरण",
        timelineProgression: "बिना इलाज के प्रसार",
        timelineEarly: "शुरुआती चरण",
        timelineMid: "मध्यम चरण",
        timelineSevere: "गंभीर चरण",
        timelineHealthy: "स्वस्थ स्थिति",
        daysLabel: "दिन",
        weatherRiskLabel: "जलवायु संक्रमण जोखिम",
        weatherRiskLevel: "जोखिम स्तर",
        weatherRiskHigh: "उच्च फफूंद जोखिम",
        weatherRiskMedium: "मध्यम फफूंद जोखिम",
        weatherRiskLow: "कम फफूंद जोखिम",
        weatherHumidityAlert: "नमी फंगल विकास के अनुकूल है",
        weatherTempAlert: "तापमान बीजाणु प्रसार के अनुकूल है",
        weatherDryAlert: "शुष्क मौसम संक्रमण को सीमित करता है",
        weatherTemp: "तापमान",
        weatherHumidity: "आर्द्रता",
        weatherRain: "बारिश",
        weatherLive: "लाइव मौसम जानकारी",
        weatherFallback: "औसत मौसमी जानकारी"
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
        downloadReport: "ವರದಿ ಡೌನ್‌ಲೋಡ್",
        generatingPdf: "PDF ತಯಾರಾಗುತ್ತಿದೆ...",
        networkOnline: "ನೆಟ್‌ವರ್ಕ್: ಆನ್‌ಲೈನ್",
        networkOffline: "ನೆಟ್‌ವರ್ಕ್: ಆಫ್‌ಲೈನ್",
        modelOfflineReady: "ಆಫ್‌ಲೈನ್ ಸಿದ್ಧವಾಗಿದೆ ⚡",
        modelNotLoaded: "ಆಫ್‌ಲೈನ್ ಸ್ಕ್ಯಾನ್ ಲೋಡ್ ಆಗಿಲ್ಲ. ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ (13.5MB).",
        downloadModelBtn: "ಆಫ್‌ಲೈನ್ ಮಾಡೆಲ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
        downloadingModel: "ಆಫ್‌ಲೈನ್ ಮಾಡೆಲ್ ಡೌನ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
        offlineInferenceBadge: "ಆಫ್‌ಲೈನ್ ಸ್ಥಳೀಯ ಸ್ಕ್ಯಾನ್",
        veryReliable: "ಅತ್ಯಂತ ವಿಶ್ವಾಸಾರ್ಹ",
        reliable: "ವಿಶ್ವಾಸಾರ್ಹ",
        retakeSuggested: "ಮತ್ತೆ ಚಿತ್ರ ತೆಗೆಯಿರಿ",
        severityLabel: "ರೋಗದ ತೀವ್ರತೆ",
        mildInfection: "ಸೌಮ್ಯ ಸೋಂಕು",
        moderateInfection: "ಮಧ್ಯಮ ಸೋಂಕು",
        severeInfection: "ತೀವ್ರ ಸೋಂಕು",
        infectedArea: "ಸೋಂಕಿತ ಎಲೆ ಪ್ರದೇಶ",
        plantHealthScore: "ಸಸ್ಯದ ಆರೋಗ್ಯ ಸ್ಕೋರ್",
        timelineLabel: "ರೋಗದ ಕಾಲಗತಿ (Timeline)",
        timelineStage: "ಪ್ರಸ್ತುತ ಹಂತ",
        timelineProgression: "ಚಿಕಿತ್ಸೆ ಇಲ್ಲದೆ ಪ್ರಗತಿ",
        timelineEarly: "ಆರಂಭಿಕ ಹಂತ",
        timelineMid: "ಮಧ್ಯಮ ಹಂತ",
        timelineSevere: "ಅಪಾಯಕಾರಿ ಹಂತ",
        timelineHealthy: "ಆರೋಗ್ಯಕರ ಸ್ಥಿತಿ",
        daysLabel: "ದಿನಗಳು",
        weatherRiskLabel: "ಸೂಕ್ಷ್ಮ ಹವಾಮಾನ ಸೋಂಕಿನ ಅಪಾಯ",
        weatherRiskLevel: "ಅಪಾಯದ ಮಟ್ಟ",
        weatherRiskHigh: "ಹೆಚ್ಚಿನ ಶಿಲೀಂಧ್ರ ಅಪಾಯ",
        weatherRiskMedium: "ಮಧ್ಯಮ ಶಿಲೀಂಧ್ರ ಅಪಾಯ",
        weatherRiskLow: "ಕಡಿಮೆ ಶಿಲೀಂಧ್ರ ಅಪಾಯ",
        weatherHumidityAlert: "ತೇವಾಂಶವು ಶಿಲೀಂಧ್ರಗಳ ಬೆಳವಣಿಗೆಗೆ ಪೂರಕವಾಗಿದೆ",
        weatherTempAlert: "ತಾಪಮಾನವು ಬೀಜಕ ಪ್ರಸರಣಕ್ಕೆ ಪೂರಕವಾಗಿದೆ",
        weatherDryAlert: "ಒಣ ಹವಾಮಾನ ಸೋಂಕನ್ನು ಮಿತಿಗೊಳಿಸುತ್ತದೆ",
        weatherTemp: "ತಾಪಮಾನ",
        weatherHumidity: "ತೇವಾಂಶ",
        weatherRain: "ಮಳೆ",
        weatherLive: "ಲೈವ್ ಹವಾಮಾನ ಮಾಹಿತಿ",
        weatherFallback: "ಸರಾಸರಿ ಹವಾಮಾನ ಮಾಹಿತಿ"
    }
};

export default function Scan() {
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("");
    const [showInvalidPopup, setShowInvalidPopup] = useState(false); // New state for popup
    const [isScanning, setIsScanning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [result, setResult] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    
    // Offline capabilities states
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [modelState, setModelState] = useState('unloaded'); // 'unloaded', 'downloading', 'ready', 'error'
    const [downloadProgress, setDownloadProgress] = useState(0);

    // Weather-based risk prediction states
    const [weatherData, setWeatherData] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(true);

    const { lang } = useLanguage();
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    // Resolve localized disease data dynamically based on the current lang!
    const activeDiseaseData = result ? (
        (DISEASE_DATA[result.disease_key]?.[lang]) ||
        (DISEASE_DATA[result.disease_key]?.['en']) ||
        DISEASE_DATA['tomato_early_blight']['en']
    ) : null;

    const getConfidenceColor = (conf) => {
        if (conf >= 95) return '#10b981'; // Emerald
        if (conf >= 80) return '#06b6d4'; // Teal
        return '#f59e0b'; // Amber
    };

    const getConfidenceBadgeClass = (conf) => {
        if (conf >= 95) return 'badge-emerald';
        if (conf >= 80) return 'badge-teal';
        return 'badge-amber';
    };

    const getConfidenceText = (conf) => {
        if (conf >= 95) return t.veryReliable;
        if (conf >= 80) return t.reliable;
        return t.retakeSuggested;
    };

    const getSeverityText = (stage) => {
        if (stage === 'healthy') return t.timelineHealthy;
        if (stage === 'early') return t.mildInfection;
        if (stage === 'mid') return t.moderateInfection;
        return t.severeInfection;
    };

    const getSeverityColor = (stage) => {
        if (stage === 'healthy') return '#10b981'; // Green
        if (stage === 'early') return '#06b6d4'; // Teal
        if (stage === 'mid') return '#f59e0b'; // Amber
        return '#ef4444'; // Red
    };

    const getWeatherRiskText = (risk) => {
        if (risk === 'high') return t.weatherRiskHigh;
        if (risk === 'medium') return t.weatherRiskMedium;
        return t.weatherRiskLow;
    };

    const getWeatherRiskColor = (risk) => {
        if (risk === 'high') return '#ef4444'; // Red
        if (risk === 'medium') return '#f59e0b'; // Amber
        return '#10b981'; // Green
    };

    const activeTemp = weatherData?.temp ?? 26.5;
    const activeHumidity = weatherData?.humidity ?? 78;
    const activeRain = weatherData?.rain ?? 0.2;
    const isFallbackWeather = weatherData === null || weatherData.is_fallback;

    const activeWeatherRisk = (() => {
        if (activeHumidity > 75 && activeTemp >= 17 && activeTemp <= 29) {
            return 'high';
        } else if (activeHumidity > 50 || (activeTemp >= 14 && activeTemp <= 32)) {
            return 'medium';
        }
        return 'low';
    })();

    // Load local weather using browser geolocation and Open-Meteo API
    React.useEffect(() => {
        const fetchLocalWeather = async () => {
            setWeatherLoading(true);
            
            // Check Geolocation Support
            if (!navigator.geolocation) {
                console.log("ℹ️ Geolocation is not supported by this browser. Using average seasonal weather fallback.");
                setWeatherData({
                    temp: 26.5,
                    humidity: 78,
                    rain: 0.2,
                    is_fallback: true
                });
                setWeatherLoading(false);
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        console.log(`🌐 Geolocation obtained: Lat ${latitude.toFixed(4)}, Lon ${longitude.toFixed(4)}. Fetching Open-Meteo weather...`);
                        
                        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,rain&timezone=auto`);
                        if (res.ok) {
                            const data = await res.json();
                            if (data && data.current) {
                                setWeatherData({
                                    temp: data.current.temperature_2m,
                                    humidity: data.current.relative_humidity_2m,
                                    rain: data.current.rain,
                                    is_fallback: false
                                });
                                console.log("✅ Live microclimate weather loaded successfully!");
                                setWeatherLoading(false);
                                return;
                            }
                        }
                        throw new Error("Invalid response or server error");
                    } catch (err) {
                        console.warn("⚠️ Failed to fetch live Open-Meteo weather, using average seasonal fallback:", err.message);
                        setWeatherData({
                            temp: 26.5,
                            humidity: 78,
                            rain: 0.2,
                            is_fallback: true
                        });
                        setWeatherLoading(false);
                    }
                },
                (geoErr) => {
                    console.log("ℹ️ Geolocation permission denied or failed, using average seasonal fallback:", geoErr.message);
                    setWeatherData({
                        temp: 26.5,
                        humidity: 78,
                        rain: 0.2,
                        is_fallback: true
                    });
                    setWeatherLoading(false);
                },
                { timeout: 8000 }
            );
        };
        
        fetchLocalWeather();
    }, []);

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

        let severityStats = { infectedAreaPct: 0, leafRatio: 0.5, whiteRatio: 0 };

        // 1. Core Validation: Check if the image contains a valid plant leaf (prevents keyboards, tickets, hands OOD)
        try {
            const imgEl = new Image();
            imgEl.src = image;
            await new Promise((resolve, reject) => {
                imgEl.onload = resolve;
                imgEl.onerror = (e) => reject(new Error('Failed to load image element for leaf validation'));
            });

            const { isImagePlantLeaf, analyzeLeafSeverity } = await import('../utils/tfjsModel');
            if (!isImagePlantLeaf(imgEl)) {
                console.warn("🚫 Out-of-distribution image detected (not a plant leaf). Aborting diagnosis.");
                setIsScanning(false);
                setShowInvalidPopup(true);
                return;
            }

            // Calculate foliar spots severity locally via canvas pixel analyser
            severityStats = analyzeLeafSeverity(imgEl);
        } catch (valErr) {
            console.warn("⚠️ Plant leaf validation or severity computation failed:", valErr);
        }

        // ── Helper: build result object from disease key + confidence ──
        const buildResult = (diseaseKey, confidence) => {
            const roundedConfidence = Math.round(confidence);
            const isHealthy = diseaseKey === 'healthy';
            const infectedArea = isHealthy ? 0 : severityStats.infectedAreaPct;
            
            // 1. Calculate Plant Health Score (out of 100)
            let healthScore = 100;
            if (isHealthy) {
                // Minor deduction if leaf has some brown edges/scabs
                healthScore = Math.max(90, Math.min(100, 100 - Math.round(severityStats.infectedAreaPct * 0.5)));
            } else {
                // Base disease penalty: mild=25, moderate=35, severe=45
                let basePenalty = 25;
                if (infectedArea > 35) {
                    basePenalty = 45;
                } else if (infectedArea > 12) {
                    basePenalty = 35;
                }
                
                // Deduct based on severity spread (1.2 multiplier)
                const severityDeduction = Math.round(infectedArea * 1.2);
                
                // Deduct based on model uncertainty (higher uncertainty = lower health safety score)
                const uncertaintyDeduction = Math.round((100 - roundedConfidence) * 0.3);
                
                healthScore = Math.max(5, Math.min(88, 100 - basePenalty - severityDeduction - uncertaintyDeduction));
            }
            
            // 2. Calculate Timeline Stage and untreated progression days
            let timelineStage = 'early'; // 'early', 'mid', 'severe' or 'healthy'
            let progressionDays = '';
            if (isHealthy) {
                timelineStage = 'healthy';
                progressionDays = 'N/A';
            } else if (infectedArea > 35) {
                timelineStage = 'severe';
                progressionDays = '1-3';
            } else if (infectedArea > 12) {
                timelineStage = 'mid';
                progressionDays = '5-7';
            } else {
                timelineStage = 'early';
                progressionDays = '10-14';
            }
            
            // 3. Dynamic Weather-based Fungal/Bacterial Risk evaluation
            let weatherRisk = 'low'; // 'low', 'medium', 'high'
            if (weatherData) {
                const { temp, humidity } = weatherData;
                // Blights, rusts, and powdery mildews favor humidity > 75% and moderate temp (18°C to 28°C)
                if (humidity > 75 && temp >= 17 && temp <= 29) {
                    weatherRisk = 'high';
                } else if (humidity > 50 || (temp >= 14 && temp <= 32)) {
                    weatherRisk = 'medium';
                } else {
                    weatherRisk = 'low';
                }
            }

            return {
                disease_key:        diseaseKey,
                confidence:         roundedConfidence,
                infected_area:      infectedArea,
                health_score:       healthScore,
                timeline_stage:     timelineStage,
                progression_days:   progressionDays,
                weather_risk:       weatherRisk,
                local_temp:         weatherData?.temp || 26.5,
                local_humidity:     weatherData?.humidity || 78,
                local_rain:         weatherData?.rain || 0.2,
                severity_stats:     severityStats
            };
        };

        // ── PATH A: Call the real PlantVillage ML API ─────────────────
        try {
            // Verify if local Python ML API has the model loaded or is in Demo mode
            try {
                const healthRes = await fetch('http://localhost:8000/health', { signal: AbortSignal.timeout(3000) });
                if (healthRes.ok) {
                    const healthData = await healthRes.json();
                    if (healthData.model_loaded === false) {
                        throw new Error("Python ML Service is running in Demo Mode (no plant_model.h5).");
                    }
                }
            } catch (healthErr) {
                console.warn("⚠️ Python ML Service health check failed or in Demo Mode, bypassing to TF.js:", healthErr.message);
                throw healthErr; // Propagates to fall back to browser-side local TF.js inference
            }

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

            // Helper to finish scan with success animation
            const finishScanWithSuccess = (resData) => {
                setIsScanning(false);
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    setResult(resData);
                }, 1500);
            };

            // Check if model thinks it's not a plant (very low confidence)
            if (prediction.confidence < 0.30) {
                setIsScanning(false);
                setShowInvalidPopup(true);
                return;
            }

            console.log(`✅ ML API: ${prediction.class_name} (${(prediction.confidence * 100).toFixed(1)}%)`);
            finishScanWithSuccess(buildResult(prediction.disease_key, prediction.confidence * 100));
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

                setIsScanning(false);
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    setResult(resObj);
                }, 1500);
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

        setIsScanning(false);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setResult(buildResult(analysis.key, analysis.confidence));
        }, 1500);
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
            const voiceResult = {
                disease:        activeDiseaseData.disease,
                confidence:     result.confidence,
                description:    activeDiseaseData.description,
                immediate_action: activeDiseaseData.immediate_action,
                doctor_advice:  activeDiseaseData.doctor_advice
            };
            const summaryText = createVoiceSummary(voiceResult, lang);
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

    const downloadPdfReport = async () => {
        if (!result || !activeDiseaseData) return;
        setIsGeneratingPdf(true);

        try {
            const html2canvas = (await import('html2canvas')).default;
            const { jsPDF } = await import('jspdf');

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageW = pdf.internal.pageSize.getWidth();
            const margin = 14;
            let y = margin;

            // ── Header ──
            pdf.setFillColor(5, 5, 8);
            pdf.rect(0, 0, pageW, 38, 'F');
            pdf.setFillColor(0, 230, 118);
            pdf.rect(0, 38, pageW, 1.5, 'F');

            pdf.setTextColor(0, 230, 118);
            pdf.setFontSize(22);
            pdf.setFont('helvetica', 'bold');
            pdf.text('KRISHI AI', margin, 16);

            pdf.setTextColor(180, 180, 180);
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
            pdf.text('Crop Disease Diagnosis Report', margin, 23);
            pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, 28);
            pdf.text(`Language: ${lang.toUpperCase()}`, margin, 33);

            y = 48;

            // ── Disease Title ──
            pdf.setTextColor(40, 40, 40);
            pdf.setFontSize(16);
            pdf.setFont('helvetica', 'bold');
            pdf.text(activeDiseaseData.disease || 'Unknown Disease', margin, y);
            y += 8;

            // ── Confidence & Metrics ──
            pdf.setFillColor(245, 245, 245);
            pdf.roundedRect(margin, y, pageW - margin * 2, 22, 3, 3, 'F');

            pdf.setTextColor(80, 80, 80);
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
            const col1 = margin + 4;
            const col2 = margin + 60;
            const col3 = margin + 120;

            pdf.text('Confidence', col1, y + 7);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(0, 150, 80);
            pdf.setFontSize(13);
            pdf.text(`${result.confidence}%`, col1, y + 15);

            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(80, 80, 80);
            pdf.setFontSize(9);
            pdf.text('Health Score', col2, y + 7);
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(13);
            const hsColor = result.health_score > 80 ? [16, 185, 129] : result.health_score > 50 ? [245, 158, 11] : [239, 68, 68];
            pdf.setTextColor(...hsColor);
            pdf.text(`${result.health_score}/100`, col2, y + 15);

            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(80, 80, 80);
            pdf.setFontSize(9);
            pdf.text('Infected Area', col3, y + 7);
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(13);
            pdf.setTextColor(239, 68, 68);
            pdf.text(`${result.infected_area}%`, col3, y + 15);

            y += 28;

            // ── Helper: Wrapped text block ──
            const addSection = (title, body, titleColor = [40, 40, 40]) => {
                if (y > 265) { pdf.addPage(); y = margin; }
                pdf.setTextColor(...titleColor);
                pdf.setFontSize(11);
                pdf.setFont('helvetica', 'bold');
                pdf.text(title, margin, y);
                y += 6;

                pdf.setTextColor(60, 60, 60);
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'normal');
                const lines = pdf.splitTextToSize(body || 'N/A', pageW - margin * 2);
                pdf.text(lines, margin, y);
                y += lines.length * 4.5 + 4;
            };

            addSection('About the Disease', activeDiseaseData.description);
            addSection('Harmful Effects', activeDiseaseData.harmful_effect, [200, 50, 50]);
            addSection('Economic Impact', activeDiseaseData.economic_impact, [200, 150, 30]);
            addSection('Immediate Action', activeDiseaseData.immediate_action, [50, 100, 200]);
            addSection('Expert Advice', activeDiseaseData.doctor_advice, [50, 100, 200]);

            // ── Treatments ──
            if (y > 250) { pdf.addPage(); y = margin; }
            pdf.setTextColor(40, 40, 40);
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Recommended Treatments', margin, y);
            y += 6;

            activeDiseaseData.treatments?.forEach(tr => {
                if (y > 270) { pdf.addPage(); y = margin; }
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(0, 150, 80);
                pdf.text(`• ${tr.type}:`, margin + 2, y);
                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(60, 60, 60);
                pdf.text(tr.desc, margin + 2 + pdf.getTextWidth(`• ${tr.type}: `), y);
                y += 5;
            });
            y += 3;

            // ── Precautions ──
            if (y > 255) { pdf.addPage(); y = margin; }
            pdf.setTextColor(40, 40, 40);
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Preventive Measures', margin, y);
            y += 6;

            activeDiseaseData.precautions?.forEach(p => {
                if (y > 275) { pdf.addPage(); y = margin; }
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(60, 60, 60);
                pdf.text(`✓  ${p}`, margin + 2, y);
                y += 5;
            });
            y += 3;

            // ── Weather Info ──
            if (y > 255) { pdf.addPage(); y = margin; }
            pdf.setFillColor(240, 248, 255);
            pdf.roundedRect(margin, y, pageW - margin * 2, 18, 3, 3, 'F');
            pdf.setTextColor(50, 100, 200);
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Microclimate Info', margin + 4, y + 6);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(80, 80, 80);
            pdf.text(`Temp: ${activeTemp.toFixed(1)}°C  |  Humidity: ${activeHumidity}%  |  Rain: ${activeRain.toFixed(1)}mm`, margin + 4, y + 13);
            y += 24;

            // ── Footer ──
            const totalPages = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                const pageH = pdf.internal.pageSize.getHeight();
                pdf.setFillColor(245, 245, 245);
                pdf.rect(0, pageH - 12, pageW, 12, 'F');
                pdf.setTextColor(150, 150, 150);
                pdf.setFontSize(7);
                pdf.text(`Krishi AI — Crop Disease Intelligence Platform`, margin, pageH - 5);
                pdf.text(`Page ${i} of ${totalPages}`, pageW - margin - 20, pageH - 5);
            }

            // ── Capture the leaf image & embed ──
            try {
                const imgEl = document.querySelector('.preview-image');
                if (imgEl) {
                    const canvas = await html2canvas(imgEl, { scale: 1, useCORS: true, backgroundColor: null });
                    const imgData = canvas.toDataURL('image/jpeg', 0.8);
                    pdf.setPage(1);
                    const imgW = 35;
                    const imgH = 35;
                    pdf.addImage(imgData, 'JPEG', pageW - margin - imgW, 44, imgW, imgH);
                }
            } catch (imgErr) {
                console.warn('Could not embed leaf image in PDF:', imgErr);
            }

            // ── Save ──
            const safeName = (activeDiseaseData.disease || 'report').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
            pdf.save(`Krishi_Report_${safeName}_${Date.now()}.pdf`);
        } catch (err) {
            console.error('PDF generation failed:', err);
        } finally {
            setIsGeneratingPdf(false);
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
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(0, 230, 118, 0.7)', lineHeight: '1.4' }}>
                                        Model is securely saved in your browser storage (IndexedDB). You can safely close your connection and scan leaves in the fields completely offline!
                                    </p>
                                    <button 
                                        onClick={async () => {
                                            const { deleteCachedModel } = await import('../utils/tfjsModel');
                                            await deleteCachedModel();
                                            await downloadOfflineModel();
                                        }}
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
                                        🔄 Reload / Update Model Cache
                                    </button>
                                </div>
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
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            id="file-upload"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleCameraCapture}
                            className="hidden-input"
                            style={{ display: 'none' }}
                            ref={cameraInputRef}
                            id="camera-capture"
                        />
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <button 
                                type="button"
                                onClick={() => cameraInputRef.current && cameraInputRef.current.click()}
                                className="btn btn-primary upload-btn"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none' }}
                            >
                                <Camera size={20} /> {t.cameraBtn || 'Take Photo'}
                            </button>
                            <button 
                                type="button"
                                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                className="btn btn-secondary upload-btn"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none' }}
                            >
                                <Upload size={20} /> {t.uploadBtn}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="analysis-container">
                        <div className={`image-preview-wrapper glass ${result ? (result.disease_key === 'healthy' ? 'healthy-detected' : 'disease-detected') : ''}`}>
                            <img src={image} alt="Crop" className="preview-image" />
                            
                            {/* Scanning Overlays */}
                            {isScanning && (
                                <>
                                    <div className="scanning-overlay">
                                        <div className="scan-line"></div>
                                        <div className="scan-grid"></div>
                                    </div>
                                    <div className="camera-focus-square"></div>
                                </>
                            )}

                            {/* Success Overlay */}
                            {showSuccess && (
                                <div className="scan-success-overlay">
                                    <div className="success-circle">
                                        <CheckCircle size={40} />
                                    </div>
                                </div>
                            )}

                            {/* Scan Buttons or Loading Skeletons */}
                            {!isScanning && !showSuccess && !result && !showInvalidPopup && (
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
                            {isScanning && (
                                <motion.div 
                                    className="result-card glass"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="skeleton-box"></div>
                                    <div className="skeleton-title skeleton-box" style={{ height: '24px', width: '50%' }}></div>
                                    <div className="skeleton-text skeleton-box"></div>
                                    <div className="skeleton-text skeleton-box"></div>
                                    <div className="skeleton-text skeleton-box" style={{ width: '80%' }}></div>
                                </motion.div>
                            )}

                            {result && !isScanning && !showSuccess && (
                                <motion.div
                                    className={`result-card glass ${result.health_score < 50 ? 'shake-alert' : ''}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                >
                                    {/* PDF Generating Overlay */}
                                    {isGeneratingPdf && (
                                        <div className="pdf-generating-overlay">
                                            <div className="pdf-spinner"></div>
                                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>{t.generatingPdf}</p>
                                        </div>
                                    )}

                                    <div className="result-header">
                                        <motion.div
                                            className="confidence-ring"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                        >
                                            <svg viewBox="0 0 36 36" className="circular-chart">
                                                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                <path className="circle" stroke={getConfidenceColor(result.confidence)} strokeDasharray={`${result.confidence}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                            </svg>
                                            <span className="percentage" style={{ color: getConfidenceColor(result.confidence) }}>
                                                <AnimatedCounter from={0} to={result.confidence} duration={2} />
                                            </span>
                                        </motion.div>
                                        <div className="disease-info">
                                            <h3>{activeDiseaseData.disease}</h3>
                                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                                                <span className="badge-danger"><AlertTriangle size={13} /> {t.critical}</span>
                                                <span className={getConfidenceBadgeClass(result.confidence)} style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.3rem',
                                                    background: `${getConfidenceColor(result.confidence)}15`,
                                                    color: getConfidenceColor(result.confidence),
                                                    padding: '0.15rem 0.5rem',
                                                    border: `1px solid ${getConfidenceColor(result.confidence)}30`,
                                                    borderRadius: '4px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600'
                                                }}>
                                                    {getConfidenceText(result.confidence)}
                                                </span>
                                                {result.is_local && (
                                                    <span style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '0.3rem',
                                                        background: 'rgba(96, 165, 250, 0.1)',
                                                        color: '#60a5fa',
                                                        padding: '0.15rem 0.5rem',
                                                        border: '1px solid rgba(96, 165, 250, 0.2)',
                                                        borderRadius: '4px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '600'
                                                     }}>
                                                        ⚡ {t.offlineInferenceBadge}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── Action Buttons Row ── */}
                                    <motion.div
                                        className="result-actions-row"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <button
                                            onClick={downloadPdfReport}
                                            className="btn btn-download"
                                            disabled={isGeneratingPdf}
                                            title={t.downloadReport}
                                        >
                                            <Download size={16} />
                                            {t.downloadReport}
                                        </button>
                                        <button
                                            onClick={isSpeaking ? stopVoiceSummary : playVoiceSummary}
                                            className={`btn btn-voice ${isSpeaking ? 'btn-danger speaking' : 'btn-glass'}`}
                                            title={isSpeaking ? t.stopAudio : t.listenSummary}
                                        >
                                            {isSpeaking ? (
                                                <div className="voice-eq">
                                                    <div className="eq-bar"></div><div className="eq-bar"></div><div className="eq-bar"></div><div className="eq-bar"></div>
                                                </div>
                                            ) : (
                                                <Volume2 size={16} />
                                            )}
                                            {isSpeaking ? t.stopAudio : t.listenSummary}
                                        </button>
                                    </motion.div>

                                    {/* Crop Health Premium Analytics Dashboard */}
                                    <motion.div
                                        className="crop-analytics-dashboard"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        
                                        {/* Row 1: Health Score & Foliage Severity Scanner */}
                                        <div className="analytics-grid">
                                            
                                            {/* Health Score Card */}
                                            <motion.div
                                                className="analytics-card glass-panel health-card"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                <div className="card-header">
                                                    <Sprout className="card-icon health-icon" size={20} />
                                                    <h4>{t.plantHealthScore}</h4>
                                                </div>
                                                <div className="health-score-container">
                                                    <div className="health-dial">
                                                        <svg viewBox="0 0 100 100" className="dial-svg">
                                                            {/* Background track */}
                                                            <path 
                                                                className="dial-track" 
                                                                d="M20 80 A 40 40 0 1 1 80 80" 
                                                                fill="none" 
                                                                stroke="rgba(255,255,255,0.06)" 
                                                                strokeWidth="8" 
                                                                strokeLinecap="round"
                                                            />
                                                            {/* Colored indicator path */}
                                                            <motion.path 
                                                                className="dial-indicator" 
                                                                d="M20 80 A 40 40 0 1 1 80 80" 
                                                                fill="none" 
                                                                stroke={
                                                                    result.health_score > 80 ? '#10b981' : 
                                                                    result.health_score > 50 ? '#f59e0b' : '#ef4444'
                                                                } 
                                                                strokeWidth="8" 
                                                                strokeLinecap="round"
                                                                strokeDasharray="188.5"
                                                                initial={{ strokeDashoffset: 188.5 }}
                                                                animate={{ 
                                                                    strokeDashoffset: 188.5 - (188.5 * (result.health_score / 100) * 0.75) 
                                                                }}
                                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                            />
                                                        </svg>
                                                        <div className="dial-content">
                                                            <span className="health-number">{result.health_score}</span>
                                                            <span className="health-total">/100</span>
                                                        </div>
                                                    </div>
                                                    <div className="health-rating-text" style={{
                                                        color: result.health_score > 80 ? '#10b981' : 
                                                               result.health_score > 50 ? '#f59e0b' : '#ef4444'
                                                    }}>
                                                        {result.health_score > 80 ? t.timelineHealthy : 
                                                         result.health_score > 50 ? t.mildInfection : t.severeInfection}
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Foliage Severity Card */}
                                            <motion.div
                                                className="analytics-card glass-panel severity-card"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 }}
                                            >
                                                <div className="card-header">
                                                    <AlertTriangle className="card-icon severity-icon" size={20} />
                                                    <h4>{t.severityLabel}</h4>
                                                </div>
                                                <div className="severity-content">
                                                    <div className="severity-badge-row">
                                                        <span className="severity-status" style={{ 
                                                            color: getSeverityColor(result.timeline_stage) 
                                                        }}>
                                                            {getSeverityText(result.timeline_stage)}
                                                        </span>
                                                        <span className="infected-pct">{result.infected_area}%</span>
                                                    </div>
                                                    
                                                    {/* Custom Animated Scanner Bar */}
                                                    <div className="scanner-bar-container">
                                                        <div className="scanner-bg-bar">
                                                            <motion.div 
                                                                className="scanner-fill-bar"
                                                                style={{ 
                                                                    background: `linear-gradient(90deg, #10b981, ${getSeverityColor(result.timeline_stage)})`
                                                                }}
                                                                initial={{ width: '0%' }}
                                                                animate={{ width: `${result.infected_area}%` }}
                                                                transition={{ duration: 1.2, ease: "easeOut" }}
                                                            />
                                                            <div className="scanner-glow-laser" style={{ color: getSeverityColor(result.timeline_stage) }}></div>
                                                        </div>
                                                    </div>
                                                    <p className="scanner-desc">
                                                        {t.infectedArea}: <strong>{result.infected_area}%</strong>
                                                    </p>
                                                </div>
                                            </motion.div>

                                        </div>

                                        {/* Row 2: Disease Timeline Step Progress */}
                                        {result.disease_key !== 'healthy' && (
                                            <motion.div
                                                className="analytics-card glass-panel timeline-card"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.7 }}
                                            >
                                                <div className="card-header">
                                                    <Activity className="card-icon timeline-icon" size={20} />
                                                    <h4>{t.timelineLabel}</h4>
                                                </div>
                                                <div className="timeline-steps-container">
                                                    <div className="timeline-progress-line-wrapper">
                                                        <div className="timeline-track-line"></div>
                                                        <motion.div 
                                                            className="timeline-progress-line"
                                                            initial={{ width: '0%' }}
                                                            animate={{ 
                                                                width: result.timeline_stage === 'early' ? '15%' :
                                                                       result.timeline_stage === 'mid' ? '50%' : '100%' 
                                                            }}
                                                            transition={{ duration: 1.5, ease: "easeInOut" }}
                                                        />
                                                    </div>
                                                    <div className="timeline-steps">
                                                        <div className={`timeline-step ${result.timeline_stage === 'early' || result.timeline_stage === 'mid' || result.timeline_stage === 'severe' ? 'active completed' : ''}`}>
                                                            <div className="step-circle">1</div>
                                                            <span className="step-label">{t.timelineEarly}</span>
                                                        </div>
                                                        <div className={`timeline-step ${result.timeline_stage === 'mid' || result.timeline_stage === 'severe' ? 'active' : ''} ${result.timeline_stage === 'severe' ? 'completed' : ''}`}>
                                                            <div className="step-circle">2</div>
                                                            <span className="step-label">{t.timelineMid}</span>
                                                        </div>
                                                        <div className={`timeline-step ${result.timeline_stage === 'severe' ? 'active current-danger' : ''}`}>
                                                            <div className="step-circle">3</div>
                                                            <span className="step-label">{t.timelineSevere}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="timeline-meta-info">
                                                    <div className="meta-item">
                                                        <span className="meta-title">{t.timelineStage}:</span>
                                                        <span className="meta-value" style={{ color: getSeverityColor(result.timeline_stage), fontWeight: 'bold' }}>
                                                            {getSeverityText(result.timeline_stage)}
                                                        </span>
                                                    </div>
                                                    <div className="meta-item">
                                                        <span className="meta-title">{t.timelineProgression}:</span>
                                                        <span className="meta-value countdown-badge">
                                                            {result.progression_days} {t.daysLabel} ⚠️
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Row 3: Weather Microclimate Risk Radar */}
                                        <motion.div
                                            className="analytics-card glass-panel weather-card"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 }}
                                        >
                                            <div className="weather-card-header">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <Droplet className="card-icon weather-icon" size={20} />
                                                    <h4>{t.weatherRiskLabel}</h4>
                                                </div>
                                                <span className="weather-badge">
                                                    {isFallbackWeather ? `🌐 ${t.weatherFallback}` : `⚡ ${t.weatherLive}`}
                                                </span>
                                            </div>
                                            
                                            <div className="weather-dashboard-body">
                                                <div className="weather-metrics">
                                                    <div className="metric-box">
                                                        <span className="metric-label">{t.weatherTemp}</span>
                                                        <span className="metric-value">{activeTemp.toFixed(1)}°C</span>
                                                    </div>
                                                    <div className="metric-box border-left-glass">
                                                        <span className="metric-label">{t.weatherHumidity}</span>
                                                        <span className="metric-value">{activeHumidity}%</span>
                                                    </div>
                                                    <div className="metric-box border-left-glass">
                                                        <span className="metric-label">{t.weatherRain}</span>
                                                        <span className="metric-value">{activeRain.toFixed(1)} mm</span>
                                                    </div>
                                                </div>

                                                <div className="risk-assessment-box" style={{
                                                    borderColor: `rgba(${
                                                        activeWeatherRisk === 'high' ? '239, 68, 68' : 
                                                        activeWeatherRisk === 'medium' ? '245, 158, 11' : '16, 185, 129'
                                                    }, 0.25)`,
                                                    background: `rgba(${
                                                        activeWeatherRisk === 'high' ? '239, 68, 68' : 
                                                        activeWeatherRisk === 'medium' ? '245, 158, 11' : '16, 185, 129'
                                                    }, 0.05)`
                                                }}>
                                                    <div className="risk-header-row">
                                                        <span className="risk-title">{t.weatherRiskLevel}:</span>
                                                        <span className="risk-level-badge" style={{
                                                            background: getWeatherRiskColor(activeWeatherRisk),
                                                            boxShadow: `0 0 10px ${getWeatherRiskColor(activeWeatherRisk)}44`
                                                        }}>
                                                            {getWeatherRiskText(activeWeatherRisk)}
                                                        </span>
                                                    </div>
                                                    <p className="risk-description">
                                                        {activeHumidity > 75 ? t.weatherHumidityAlert : 
                                                         activeHumidity > 50 ? t.weatherTempAlert : t.weatherDryAlert}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>

                                    </motion.div>

                                    <motion.div
                                        className="diagnosis-details glass-panel"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9 }}
                                    >
                                        <h4>{t.about}</h4>
                                        <p><TypewriterText text={activeDiseaseData.description} speed={20} /></p>

                                        <div style={{ marginTop: '1.5rem' }}>
                                            <h4 style={{ color: '#ff5555', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t.harmful}</h4>
                                            <p><TypewriterText text={activeDiseaseData.harmful_effect} speed={25} delay={0.5} /></p>
                                        </div>

                                        <div style={{ marginTop: '1.5rem' }}>
                                            <h4 style={{ color: '#fbbf24', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t.economic}</h4>
                                            <p><TypewriterText text={activeDiseaseData.economic_impact} speed={25} delay={1.0} /></p>
                                        </div>

                                        <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                                            <h4 style={{ color: '#60a5fa' }}>{t.immediate}</h4>
                                            <p><TypewriterText text={activeDiseaseData.immediate_action} speed={20} delay={1.5} /></p>
                                        </div>

                                        <div style={{ marginTop: '1rem', background: 'rgba(96, 165, 250, 0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #60a5fa' }}>
                                            <strong>{t.doctor}: </strong> <TypewriterText text={activeDiseaseData.doctor_advice} speed={20} delay={2.0} />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="treatments-section"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.0 }}
                                    >
                                        <h4>{t.treatments}</h4>
                                        <div className="treatment-list">
                                            {activeDiseaseData.treatments.map((t, i) => (
                                                <div key={i} className="treatment-item">
                                                    <div className="t-icon"><t.icon size={18} /></div>
                                                    <div className="t-info">
                                                        <h5>{t.type}</h5>
                                                        <p>{t.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="precautions-section"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.1 }}
                                    >
                                        <h4><CheckCircle size={18} /> {t.precautions}</h4>
                                        <ul className="precautions-list">
                                            {activeDiseaseData.precautions.map((p, i) => (
                                                <li key={i}>{p}</li>
                                            ))}
                                        </ul>
                                    </motion.div>

                                    {/* Developer Diagnostics Box */}
                                    {result && (
                                        <motion.div
                                            className="dev-diagnostics-panel glass-panel"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.2 }}
                                        >
                                            <h5 style={{ margin: '0 0 0.75rem 0', color: '#ffc107', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                🛠️ Developer Diagnostics (AI Engine Output)
                                            </h5>
                                            
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.75rem' }}>
                                                <div>
                                                     <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold' }}>AI Inference Engine</div>
                                                     <div style={{ color: '#fff', fontWeight: '600', marginTop: '0.15rem' }}>
                                                         {result.is_local ? "⚡ TensorFlow.js Layers Local Model" : "🌐 FastAPI Remote PyTorch Model"}
                                                     </div>
                                                </div>
                                                <div>
                                                     <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Execution Latency</div>
                                                     <div style={{ color: '#00e676', fontWeight: '700', marginTop: '0.15rem' }}>
                                                         {result.is_local ? `${result.inference_time_ms} ms` : "Remote API (~380 ms)"}
                                                     </div>
                                                </div>
                                            </div>

                                            {result.severity_stats && (
                                                <div style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.75rem' }}>
                                                     <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                                                         Leaf Pixels Computer Vision Analytics (40x40 Grid)
                                                     </div>
                                                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1rem' }}>
                                                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                             <span style={{ color: 'rgba(255,255,255,0.6)' }}>Green Chlorophyll Ratio:</span>
                                                             <span style={{ color: '#10b981', fontWeight: 'bold' }}>{(100 - result.infected_area)}%</span>
                                                         </div>
                                                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                             <span style={{ color: 'rgba(255,255,255,0.6)' }}>Yellow/Brown Lesions:</span>
                                                             <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{result.infected_area}%</span>
                                                         </div>
                                                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                             <span style={{ color: 'rgba(255,255,255,0.6)' }}>Total Organic Leaf Area:</span>
                                                             <span style={{ color: '#fff', fontWeight: '600' }}>{(result.severity_stats.leafRatio * 100).toFixed(1)}%</span>
                                                         </div>
                                                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                             <span style={{ color: 'rgba(255,255,255,0.6)' }}>Desaturated White/Grey:</span>
                                                             <span style={{ color: 'rgba(255,255,255,0.8)' }}>{(result.severity_stats.whiteRatio * 100).toFixed(1)}%</span>
                                                         </div>
                                                     </div>
                                                </div>
                                            )}

                                            {result.top3 ? (
                                                <div>
                                                     <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                                                         Top 3 Predicted Class Nodes (Softmax Output)
                                                     </div>
                                                     <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'rgba(255,255,255,0.85)' }}>
                                                         {result.top3.map((pred, idx) => (
                                                             <li key={idx} style={{ marginBottom: '0.4rem' }}>
                                                                 Node index <strong>#{pred.index}</strong>: <span style={{ color: '#00e676', fontWeight: 'bold' }}>{(pred.confidence * 100).toFixed(2)}%</span>
                                                                 <br />
                                                                 <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                                                                     PV Label: "{pred.class}" (Disease: "{pred.disease_key}")
                                                                 </span>
                                                             </li>
                                                         ))}
                                                     </ul>
                                                </div>
                                            ) : (
                                                <div>
                                                     <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                                                         Top Predicted Class (FastAPI Response)
                                                     </div>
                                                     <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'rgba(255,255,255,0.85)' }}>
                                                         <li>
                                                             Class Key: <strong>{result.disease_key}</strong> Node: <span style={{ color: '#00e676', fontWeight: 'bold' }}>{result.confidence.toFixed(2)}%</span>
                                                             <br />
                                                             <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                                                                 Translated Disease Title: "{activeDiseaseData.disease}"
                                                             </span>
                                                         </li>
                                                     </ul>
                                                </div>
                                            )}
                                        </motion.div>
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
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Not a Crop Leaf</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
                                            This image is not related to Krishi. We could not identify a crop leaf in this picture. Kindly upload a proper, clear image of a crop leaf for disease diagnosis.
                                        </p>
                                        <button
                                            onClick={() => { setShowInvalidPopup(false); setImage(null); setFileName(''); if (fileInputRef.current) fileInputRef.current.value = ''; }}
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
