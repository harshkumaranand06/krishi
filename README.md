Krishi - AI-Powered Agriculture Assistant
Krishi is a modern, AI-powered web application designed to help farmers diagnose crop diseases, get instant remedies, and connect with agricultural experts. Built with a focus on accessibility and ease of use, it supports multiple languages and offline capabilities.

🚀 Features
Instant Disease Diagnosis: Point your camera at a leaf to instantly identify diseases using offline-capable Computer Vision.
Smart Remedies: Get precise chemical and organic treatment plans tailored to the diagnosed issue.
Multilingual Support: Fully localized in English, Hindi, and Kannada.
Offline Mode: Functional in remote areas with limited internet connectivity.
Community & Expert Access: Connect with a community of farmers and get verified advice from experts.
Market Insights: (Planned) Access real-time market prices and trends.
🛠️ Tech Stack
Frontend
Framework: React (Vite)
Styling: Vanilla CSS (with modern glassmorphism design)
Animations: Framer Motion
Icons: Lucide React
Routing: React Router DOM
Backend
Runtime: Node.js
Framework: Express.js
Database: MongoDB (Mongoose)
File Handling: Multer (for image uploads)
📂 Project Structure
Krishi/
├── frontend-new/     # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── data/
├── backend/          # Express backend server
│   ├── models/
│   ├── routes/
│   └── uploads/
⚡ Getting Started
Prerequisites
Node.js (v18 or higher)
MongoDB (Local or Atlas URI)
Installation
Clone the repository:

git clone https://github.com/yourusername/krishi.git
cd krishi
Setup Backend:

cd backend
npm install
# Create a .env file and add your MONGODB_URI and PORT
node index.js
Setup Frontend:

cd ../frontend-new
npm install
npm run dev
🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

📄 License
This project is licensed under the MIT License.
