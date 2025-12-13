import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'kn', name: 'कन्नड़' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'mr', name: 'मराठी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'ଓଡ଼ିଆ' },
    { code: 'as', name: 'অসমীয়া' },
    { code: 'ur', name: 'اردو' },
    { code: 'sa', name: 'संस्कृत' },
    { code: 'bh', name: 'भोजपुरी' }
];

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('en');

    // Load saved preference
    useEffect(() => {
        const savedLang = localStorage.getItem('krishi_lang');
        if (savedLang) setLang(savedLang);
    }, []);

    // Save preference
    useEffect(() => {
        localStorage.setItem('krishi_lang', lang);
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
