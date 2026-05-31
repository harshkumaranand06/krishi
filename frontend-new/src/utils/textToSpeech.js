// Text-to-Speech Utility for Voice Summary
// Uses Web Speech API exclusively (Google Translate TTS endpoint is blocked)
// Supports English, Hindi, and Kannada with intelligent voice selection

let isPlaying = false;
let chunkQueue = [];

/**
 * Split text into sentence-level chunks for natural speech flow
 */
function splitTextIntoChunks(text, maxLen = 200) {
    if (!text || !text.trim()) return [];

    const sentences = text.split(/(?<=[.!?।\u0964])\s+/);
    const chunks = [];

    for (const s of sentences) {
        const trimmed = s.trim();
        if (!trimmed) continue;
        if (trimmed.length <= maxLen) {
            chunks.push(trimmed);
            continue;
        }
        const words = trimmed.split(/\s+/);
        let buf = '';
        for (const w of words) {
            const test = buf ? `${buf} ${w}` : w;
            if (test.length > maxLen && buf) {
                chunks.push(buf);
                buf = w;
            } else {
                buf = test;
            }
        }
        if (buf) chunks.push(buf);
    }
    return chunks;
}

/**
 * Clean text — strip emojis and symbols that TTS engines choke on
 */
function cleanText(text) {
    if (!text) return '';
    return text
        .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
        .replace(/[⚡🛠️🎯⚠️🌐📡🏁🎙️🔊🔍📋✅❌🚫]/g, '')
        .trim();
}

/**
 * Wait for browser voices to fully load (they load asynchronously in Chrome)
 */
function getVoicesReady() {
    return new Promise((resolve) => {
        let voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            resolve(voices);
            return;
        }
        const handler = () => {
            voices = window.speechSynthesis.getVoices();
            window.speechSynthesis.removeEventListener('voiceschanged', handler);
            resolve(voices);
        };
        window.speechSynthesis.addEventListener('voiceschanged', handler);
        // Safety timeout
        setTimeout(() => {
            window.speechSynthesis.removeEventListener('voiceschanged', handler);
            resolve(window.speechSynthesis.getVoices());
        }, 3000);
    });
}

/**
 * Find the best voice for a given BCP-47 language code
 */
function findVoice(voices, bcp47) {
    const primary = bcp47.split('-')[0].toLowerCase();

    // Priority 1: Exact match (e.g. "kn-IN")
    let v = voices.find(v => v.lang.toLowerCase().replace('_', '-') === bcp47.toLowerCase());
    if (v) return v;

    // Priority 2: Prefix match — Google voices are highest quality
    v = voices.find(v => v.lang.toLowerCase().startsWith(primary) && v.name.includes('Google'));
    if (v) return v;

    // Priority 3: Any voice matching prefix
    v = voices.find(v => v.lang.toLowerCase().startsWith(primary));
    if (v) return v;

    return null;
}

/**
 * Speak a single chunk using Web Speech API
 */
function speakChunk(text, voice, bcp47) {
    return new Promise((resolve, reject) => {
        window.speechSynthesis.cancel();

        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = bcp47;
        utter.rate = 0.9;
        utter.pitch = 1.0;
        utter.volume = 1.0;

        if (voice) {
            utter.voice = voice;
        }

        // Chrome bug: long utterances randomly stop.
        // Workaround: periodically pause/resume to keep alive.
        let watchdog = null;
        if (text.length > 60) {
            watchdog = setInterval(() => {
                if (!window.speechSynthesis.speaking) {
                    clearInterval(watchdog);
                    return;
                }
                window.speechSynthesis.pause();
                window.speechSynthesis.resume();
            }, 8000);
        }

        utter.onend = () => {
            if (watchdog) clearInterval(watchdog);
            resolve();
        };
        utter.onerror = (e) => {
            if (watchdog) clearInterval(watchdog);
            // "interrupted" errors happen when we cancel — not a real error
            if (e.error === 'interrupted' || e.error === 'canceled') {
                resolve();
            } else {
                reject(new Error(`Speech error: ${e.error}`));
            }
        };

        window.speechSynthesis.speak(utter);
    });
}

// ──────────────────────────────────────────────────────────
// PUBLIC API
// ──────────────────────────────────────────────────────────

/**
 * Speak full text using Web Speech API
 *
 * @param {string} text  - Full text to speak
 * @param {string} lang  - BCP-47 code: 'en-US', 'hi-IN', 'kn-IN'
 * @param {function} onEnd - Called when all speech finishes
 */
export async function speak(text, lang = 'en-US', onEnd = null) {
    stopSpeaking();

    if (!('speechSynthesis' in window)) {
        console.warn('Speech Synthesis not supported in this browser');
        if (onEnd) onEnd();
        return;
    }

    const safe = cleanText(text);
    if (!safe) {
        if (onEnd) onEnd();
        return;
    }

    // Wait for voices to load
    const voices = await getVoicesReady();
    const shortLang = lang.split('-')[0];

    console.log(`🎙️ TTS: lang=${lang}, voices available: ${voices.length}`);

    // Find voice for requested language
    let voice = findVoice(voices, lang);

    // KANNADA SPECIAL HANDLING:
    // If no Kannada voice exists, we'll speak the text using Hindi voice
    // (since Hindi speakers in Karnataka often understand Hindi)
    // OR fall back to English voice as last resort
    let actualLang = lang;
    if (!voice) {
        console.warn(`⚠️ No voice found for ${lang}.`);

        if (shortLang === 'kn') {
            // Try Hindi voice as bridge
            const hiVoice = findVoice(voices, 'hi-IN');
            if (hiVoice) {
                console.log(`🔄 Kannada voice unavailable. Using Hindi voice as bridge: ${hiVoice.name}`);
                voice = hiVoice;
                actualLang = 'hi-IN';
                // We'll still speak the Kannada text — Hindi voice can often
                // pronounce Indic scripts reasonably, much better than English voice
            }
        }

        // Last resort: English voice
        if (!voice) {
            voice = findVoice(voices, 'en-US');
            actualLang = 'en-US';
            console.log(`🔄 Using English voice as last resort: ${voice?.name || 'default'}`);
        }
    } else {
        console.log(`✅ Found voice: ${voice.name} (${voice.lang})`);
    }

    // Split and queue
    chunkQueue = splitTextIntoChunks(safe, 200);
    isPlaying = true;

    console.log(`📢 Speaking ${chunkQueue.length} chunks...`);

    const playNext = async () => {
        if (!isPlaying || chunkQueue.length === 0) {
            isPlaying = false;
            chunkQueue = [];
            console.log('✅ TTS playback complete');
            if (onEnd) onEnd();
            return;
        }

        const chunk = chunkQueue.shift();

        try {
            await speakChunk(chunk, voice, actualLang);
        } catch (err) {
            console.warn(`TTS chunk error: ${err.message}`);
        }

        // Small pause between chunks for natural rhythm
        if (isPlaying) {
            setTimeout(playNext, 120);
        }
    };

    playNext();
}

/**
 * Stop all speech immediately
 */
export function stopSpeaking() {
    isPlaying = false;
    chunkQueue = [];
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
}

/**
 * Check if currently speaking
 */
export function isSpeaking() {
    if (isPlaying) return true;
    if ('speechSynthesis' in window) return window.speechSynthesis.speaking;
    return false;
}

/**
 * Map short language code to BCP-47
 */
export function getSpeechLang(lang) {
    return { en: 'en-US', hi: 'hi-IN', kn: 'kn-IN' }[lang] || 'en-US';
}

/**
 * Build a spoken summary from disease result
 */
export function createVoiceSummary(result, lang = 'en') {
    if (!result) return '';

    const d = result.disease || '';
    const c = result.confidence || 0;
    const desc = result.description || '';
    const act = result.immediate_action || '';
    const adv = result.doctor_advice || '';

    const map = {
        en: `Disease detected: ${d}. Confidence: ${c} percent. ${desc}. Immediate action: ${act}. ${adv}`,
        hi: `रोग की पहचान: ${d}. सटीकता: ${c} प्रतिशत. ${desc}. तत्काल कार्रवाई: ${act}. ${adv}`,
        kn: `ರೋಗ ಪತ್ತೆಯಾಗಿದೆ: ${d}. ವಿಶ್ವಾಸಾರ್ಹತೆ: ${c} ಶೇಕಡಾ. ${desc}. ತಕ್ಷಣದ ಕ್ರಮ: ${act}. ${adv}`
    };

    return map[lang] || map.en;
}
