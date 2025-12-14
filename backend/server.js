const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for now (can be restricted later)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Import Routes
const chatRoutes = require('./routes/chat');
const communityRoutes = require('./routes/community');
const marketRoutes = require('./routes/market');
const consultRoutes = require('./routes/consult');

// Use Routes
app.use('/api/chat', chatRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/consult', consultRoutes);

// Health Check Route
app.get('/', (req, res) => {
    res.json({
        message: 'Krishi Backend API is running',
        endpoints: {
            chat: '/api/chat',
            community: '/api/community/posts',
            market: '/api/market/products',
            consult: '/api/consult/experts'
        }
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cropdoctor', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
