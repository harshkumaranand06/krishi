const express = require('express');
const router = express.Router();

const chatHandler = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({ success: false, error: 'Message is required' });
        }

        const lower = message.toLowerCase().trim();
        let reply = "I am Krishi AI, your agricultural assistant. I can help with crop disease diagnosis, soil fertilization, mandi market prices, and government schemes. What would you like to know?";

        // Disease / Scan
        if (lower.includes('scan') || lower.includes('disease') || lower.includes('pest') || lower.includes('blight') || lower.includes('fungus') || lower.includes('बीमारी') || lower.includes('ರೋಗ')) {
            reply = "You can diagnose plant diseases instantly using our **Scan** feature! Just point your camera or upload a photo of the affected leaf to receive AI detection, infection severity, and recommended organic/chemical remedies.";
        } 
        // Fertilizer / Soil
        else if (lower.includes('black soil') || lower.includes('regur') || lower.includes('काली मिट्टी')) {
            reply = "Black soil (Regur) is rich in calcium, potassium, and magnesium with high moisture retention. It is ideal for **Cotton, Wheat, Jowar, Linseed, and Citrus fruits**.";
        }
        else if (lower.includes('alluvial') || lower.includes('जलोढ़')) {
            reply = "Alluvial soil is extremely fertile, deposited by rivers. It is rich in potash and ideal for **Rice (Paddy), Wheat, Sugarcane, Maize, and Jute**.";
        }
        else if (lower.includes('red soil') || lower.includes('लाल मिट्टी')) {
            reply = "Red soil has high iron content with good drainage. It responds well to irrigation and fertilizers for **Groundnut, Potato, Maize, Ragi, and Tobacco**.";
        }
        else if (lower.includes('fertilizer') || lower.includes('npk') || lower.includes('urea') || lower.includes('खाद')) {
            reply = "For general vegetative growth, an NPK ratio of **4:2:1 (N:P:K)** is common, but it varies by crop. Always conduct a soil test before applying bulk urea. Organic vermicompost (5 tons/hectare) boosts soil microbes naturally.";
        }
        // Tomato & Potato specific
        else if (lower.includes('tomato') || lower.includes('टमाटर') || lower.includes('ಟೊಮೆಟೊ')) {
            reply = "Common tomato issues include **Early Blight** (concentric target rings) and **Late Blight**. Use Copper fungicides, mulch to prevent soil splashing, and maintain 60cm plant spacing for good airflow.";
        }
        else if (lower.includes('potato') || lower.includes('आलू') || lower.includes('ಆಲೂಗಡ್ಡೆ')) {
            reply = "For potato late blight, watch out for water-soaked dark lesions with white mold under high humidity. Spray Mancozeb 75% WP @ 2.5g/L preventively, and rogue out infected plants immediately.";
        }
        // Market & Mandi prices
        else if (lower.includes('price') || lower.includes('market') || lower.includes('mandi') || lower.includes('रेट') || lower.includes('भाव') || lower.includes('ಬೆಲೆ')) {
            reply = "Check our **Market** page to explore current mandi prices, buy organic inputs, and sell your produce directly to local buyers without middlemen!";
        }
        // Consult an expert
        else if (lower.includes('expert') || lower.includes('doctor') || lower.includes('scientist') || lower.includes('सलाह') || lower.includes('ತಜ್ಞ')) {
            reply = "You can schedule live consultations with certified agronomists and plant pathologists on our **Consult** page, including audio/video sessions and WhatsApp chat.";
        }
        // Subsidies & Schemes
        else if (lower.includes('subsidy') || lower.includes('scheme') || lower.includes('yojana') || lower.includes('kusum') || lower.includes('योजना')) {
            reply = "Key government initiatives include the **PM-KUSUM Scheme** (up to 90% subsidy on solar agricultural pumps) and the **Soil Health Card Scheme**. Visit our Community feed for the latest updates!";
        }
        // Weather
        else if (lower.includes('weather') || lower.includes('rain') || lower.includes('monsoon') || lower.includes('मौसम') || lower.includes('ಮಳೆ')) {
            reply = "Ensure adequate field drainage before monsoon showers to prevent root rot. Our Scan feature automatically reads local microclimate humidity and temperature to assess fungal risk.";
        }
        // Greetings
        else if (lower.includes('hello') || lower.includes('hi') || lower.includes('namaste') || lower.includes('नमस्ते') || lower.includes('ನಮಸ್ಕಾರ')) {
            reply = "Namaste! Welcome to Krishi. How can I help you today with your crops, soil, market prices, or leaf scan?";
        }

        res.json({ success: true, reply });
    } catch (error) {
        console.error('Error in chat:', error);
        res.status(500).json({ success: false, error: 'Failed to process message' });
    }
};

// Support both /api/chat and /api/chat/chat for backwards compatibility
router.post('/', chatHandler);
router.post('/chat', chatHandler);

module.exports = router;
