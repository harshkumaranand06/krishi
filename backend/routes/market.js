const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/products', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category && category !== 'All' ? { category } : {};

        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch products' });
    }
});

// Create a new product listing
router.post('/products', async (req, res) => {
    try {
        const { name, category, price, seller, type } = req.body;

        if (!name || !category || !price || !seller) {
            return res.status(400).json({
                success: false,
                error: 'Name, category, price, and seller are required'
            });
        }

        const product = new Product({
            name,
            category,
            price,
            seller,
            type: type || 'sell',
        });

        await product.save();
        res.status(201).json({ success: true, product });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, error: 'Failed to create product' });
    }
});

module.exports = router;
