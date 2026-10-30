const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Expert = require('../models/Expert');

const DEFAULT_EXPERTS = [
    { _id: "1", id: 1, name: "Dr. Rajesh Sharma", specialty: "Plant Pathologist", experience: "15+ years", rating: 4.9, available: true, consultationFee: "₹300" },
    { _id: "2", id: 2, name: "Dr. Ananya Patel", specialty: "Crop Nutrition Specialist", experience: "12+ years", rating: 4.8, available: true, consultationFee: "₹250" },
    { _id: "3", id: 3, name: "Prof. Vikram Singh", specialty: "Organic Farming Consultant", experience: "20+ years", rating: 5.0, available: false, consultationFee: "₹500" },
    { _id: "4", id: 4, name: "Dr. Meera Nambiar", specialty: "Pest Management Expert", experience: "10+ years", rating: 4.7, available: true, consultationFee: "₹200" }
];

// Get all experts
router.get('/experts', async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.json({ success: true, experts: DEFAULT_EXPERTS, offline: true });
    }
    try {
        const experts = await Expert.find().maxTimeMS(2000);
        res.json({ success: true, experts: experts.length > 0 ? experts : DEFAULT_EXPERTS });
    } catch (error) {
        console.error('Error fetching experts from DB, using fallback:', error.message);
        res.json({ success: true, experts: DEFAULT_EXPERTS, offline: true });
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
