// Text-to-Speech Utility for Voice Summary
// Uses Web Speech API (built into modern browsers)

/**
 * Speak text using browser's text-to-speech
 * @param {string} text - Text to speak
 * @param {string} lang - Language code (en-US, hi-IN, kn-IN)
 * @param {function} onEnd - Callback when speech ends
 * @returns {SpeechSynthesisUtterance} - The utterance object
 */
export function speak(text, lang = 'en-US', onEnd = null) {
    // Check if browser supports speech synthesis
    if (!('speechSynthesis' in window)) {
        console.error('Text-to-speech not supported in this browser');
        return null;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Set language
    utterance.lang = lang;

    // Set voice properties
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Add event listeners
    if (onEnd) {
        utterance.onend = onEnd;
    }

    utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
    };

    // Speak
    window.speechSynthesis.speak(utterance);

    return utterance;
}

/**
 * Stop current speech
 */
export function stopSpeaking() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
}

/**
 * Check if currently speaking
 * @returns {boolean}
 */
export function isSpeaking() {
    if ('speechSynthesis' in window) {
        return window.speechSynthesis.speaking;
    }
    return false;
}

/**
 * Get language code for speech synthesis
 * @param {string} lang - App language code (en, hi, kn)
 * @returns {string} - Speech synthesis language code
 */
export function getSpeechLang(lang) {
    const langMap = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'kn': 'kn-IN'
    };
    return langMap[lang] || 'en-US';
}

/**
 * Create voice summary from disease result
 * @param {object} result - Disease analysis result
 * @param {string} lang - Language code
 * @returns {string} - Summary text to speak
 */
export function createVoiceSummary(result, lang = 'en') {
    if (!result) return '';

    const summaries = {
        en: `Disease detected: ${result.disease}. Confidence: ${result.confidence} percent. ${result.description}. Immediate action: ${result.immediate_action}. ${result.doctor_advice}`,
        hi: `रोग की पहचान: ${result.disease}। सटीकता: ${result.confidence} प्रतिशत। ${result.description}। तत्काल कार्रवाई: ${result.immediate_action}। ${result.doctor_advice}`,
        kn: `ರೋಗ ಪತ್ತೆಯಾಗಿದೆ: ${result.disease}। ವಿಶ್ವಾಸಾರ್ಹತೆ: ${result.confidence} ಪ್ರತಿಶತ। ${result.description}। ತಕ್ಷಣದ ಕ್ರಮ: ${result.immediate_action}। ${result.doctor_advice}`
    };

    return summaries[lang] || summaries['en'];
}
