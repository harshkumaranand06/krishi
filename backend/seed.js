const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Expert = require('./models/Expert');
const Post = require('./models/Post');
const Product = require('./models/Product');

dotenv.config();

// Sample data
const sampleExperts = [
    { name: "Dr. A. Swaminathan", role: "Soil Scientist", exp: "15 Years", rating: 4.9, status: "online", img: "S" },
    { name: "Dr. Priya Sharma", role: "Plant Pathologist", exp: "8 Years", rating: 4.8, status: "busy", img: "P" },
    { name: "Dr. Rajesh Koothrappali", role: "Entomologist", exp: "12 Years", rating: 4.7, status: "online", img: "R" },
    { name: "Prof. Vikram Sarabhai", role: "Agri-Tech Expert", exp: "20 Years", rating: 5.0, status: "online", img: "V" },
];

const samplePosts = [
    { user: "Dr. A. Swaminathan", role: "Expert", content: "To prevent root rot in tomatoes during monsoon, ensure raised beds are at least 15cm high. Also, apply Trichoderma viride.", likes: 142, replies: 12 },
    { user: "Rajesh Farmer", role: "Farmer", content: "My wheat leaves are turning yellow at the tips. Is this water stress or a disease? I watered them 2 days ago.", likes: 8, replies: 5 },
    { user: "Kissan Seva Kendra", role: "Expert", content: "⚠️ ALERT: Fall Armyworm detected in local maize crops. Check your fields early morning for larvae.", likes: 89, replies: 24 },
    { user: "Vikram Singh", role: "Farmer", content: "Success story! I switched to organic neem spray for my Brinjal crop and the borer attack has reduced by 90%. Happy to share formula.", likes: 56, replies: 18 },
];

const sampleProducts = [
    { name: "Organic Urea Fertilizer", category: "Fertilizer", price: "₹450/kg", seller: "Ramesh Kumar", type: "sell" },
    { name: "Fresh Tomatoes (Hybrid)", category: "Vegetables", price: "₹40/kg", seller: "Suresh Farm", type: "sell" },
    { name: "Pesticide Sprayer (5L)", category: "Equipment", price: "₹1200", seller: "Agri Tools Co.", type: "sell" },
    { name: "Vermicompost Pack", category: "Fertilizer", price: "₹200/kg", seller: "Green Earth", type: "sell" },
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cropdoctor', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');

        // Clear existing data
        await Expert.deleteMany({});
        await Post.deleteMany({});
        await Product.deleteMany({});
        console.log('Cleared existing data');

        // Insert sample data
        await Expert.insertMany(sampleExperts);
        console.log('✓ Experts seeded');

        await Post.insertMany(samplePosts);
        console.log('✓ Posts seeded');

        await Product.insertMany(sampleProducts);
        console.log('✓ Products seeded');

        console.log('\n🌱 Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
