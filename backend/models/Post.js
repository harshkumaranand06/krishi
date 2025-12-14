const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Farmer', 'Expert'],
        default: 'Farmer',
    },
    content: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    replies: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Post', postSchema);
