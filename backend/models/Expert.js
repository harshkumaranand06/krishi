const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    exp: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 4.5,
        min: 0,
        max: 5,
    },
    status: {
        type: String,
        enum: ['online', 'busy', 'offline'],
        default: 'offline',
    },
    img: {
        type: String,
        default: 'E',
    },
});

module.exports = mongoose.model('Expert', expertSchema);
