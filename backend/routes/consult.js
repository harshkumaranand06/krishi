const express = require('express');
const router = express.Router();
const Expert = require('../models/Expert');

// Get all experts
router.get('/experts', async (req, res) => {
    try {
        const experts = await Expert.find();
        res.json({ success: true, experts });
    } catch (error) {
        console.error('Error fetching experts:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch experts' });
    }
});

// Get expert by ID
router.get('/experts/:id', async (req, res) => {
    try {
        const expert = await Expert.findById(req.params.id);

        if (!expert) {
            return res.status(404).json({ success: false, error: 'Expert not found' });
        }

        res.json({ success: true, expert });
    } catch (error) {
        console.error('Error fetching expert:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch expert' });
    }
});

// Schedule a consultation (placeholder - can be expanded)
router.post('/schedule', async (req, res) => {
    try {
        const { expertId, type, scheduledTime } = req.body;

        // This is a placeholder - you can expand this to save consultations to DB
        res.json({
            success: true,
            message: 'Consultation scheduled successfully',
            consultation: { expertId, type, scheduledTime }
        });
    } catch (error) {
        console.error('Error scheduling consultation:', error);
        res.status(500).json({ success: false, error: 'Failed to schedule consultation' });
    }
});

module.exports = router;
