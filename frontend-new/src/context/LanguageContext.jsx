import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'kn', name: 'ಕನ್ನಡ' }
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
