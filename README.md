🌾 Krishi - AI-Powered Agriculture Assistant
Status License Version

Built for the Modern Farmer 🚜
Instant Diagnosis • Smart Remedies • Community Verified

📖 Overview
Krishi is a cutting-edge web application empowering farmers with AI-driven tools. leveraging computer vision to diagnose crop diseases instantly and providing scientifically backed remedies. With a focus on accessibility, Krishi operates offline and supports multiple local languages, bridging the gap between technology and traditional farming.

✨ Key Features
Feature	Description
🤖 Instant Scan	Advanced AI identifies plant diseases from a simple photo in seconds.
💊 Smart Remedies	Get precise chemical and organic treatment plans for your crops.
🌐 Offline Mode	Fully functional in remote fields with zero internet connectivity.
🗣️ Multilingual	Native support for English, Hindi, and Kannada.
👥 Community	Connect with experts and other farmers to validate diagnoses.
📸 Screenshots
Krishi Dashboard
Intuitive Dashboard & Scanning Interface

🛠️ Tech Stack
Frontend	Backend	Tools
React	Node.js	Vite
Framer Motion	Express.js	Git
CSS Modules	MongoDB	Figma
📂 Project Structure
Krishi/
├── 📱 frontend-new/     # React Client
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route pages (Home, Scan, etc.)
│   │   └── context/     # Global state (Lang, Chat)
├── 🖥️ backend/          # API Server
│   ├── models/          # Mongoose Schemas
│   └── routes/          # API Endpoints
└── 📄 README.md         # Documentation
⚡ Getting Started
Prerequisites
Node.js (v18+)
MongoDB (Local or Atlas)
Installation Guide
Clone the Repository

git clone https://github.com/yourusername/krishi.git
cd krishi
Backend Setup

cd backend
npm install
# Create .env with PORT=5000 and MONGO_URI
npm start
Frontend Setup

cd ../frontend-new
npm install
npm run dev
🤝 Application Flow
Select Language: Choose between English, Hindi, or Kannada.
Scan Crop: Upload or capture a photo of the affected crop.
View Results: See immediate diagnosis and confidence score.
Get Treatment: View recommended chemical and organic remedies.
📄 License
This project is open source and available under the 
MIT License
.

Built with ❤️ for Indian Farmers
