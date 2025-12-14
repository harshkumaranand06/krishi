const express = require('express');
const router = express.Router();

// Simple AI chat endpoint (can be enhanced with actual AI integration)
router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, error: 'Message is required' });
        }

        // Simple keyword-based responses (can be replaced with AI API)
        let reply = "I'm here to help with your agricultural questions. Could you please provide more details?";

        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('disease') || lowerMessage.includes('pest')) {
            reply = "For disease and pest issues, I recommend using the Scan feature to upload a photo of the affected plant. Our AI will identify the problem and suggest treatments.";
        } else if (lowerMessage.includes('fertilizer') || lowerMessage.includes('soil')) {
            reply = "Soil health is crucial! Consider getting a soil test done. For general fertilization, NPK (Nitrogen, Phosphorus, Potassium) ratios depend on your crop type. What are you growing?";
        } else if (lowerMessage.includes('price') || lowerMessage.includes('market')) {
            reply = "Check out our Market section to see current prices and connect with buyers/sellers in your area!";
        } else if (lowerMessage.includes('expert') || lowerMessage.includes('doctor')) {
            reply = "You can consult with agricultural experts through our Consult section. We have soil scientists, plant pathologists, and agri-tech specialists available.";
        }

        res.json({ success: true, reply });
    } catch (error) {
        console.error('Error in chat:', error);
        res.status(500).json({ success: false, error: 'Failed to process message' });
    }
});

module.exports = router;
