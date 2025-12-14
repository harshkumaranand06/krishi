const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Vegetables', 'Fruits', 'Fertilizer', 'Equipment', 'Seeds'],
    },
    price: {
        type: String,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['sell', 'buy'],
        default: 'sell',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Product', productSchema);
