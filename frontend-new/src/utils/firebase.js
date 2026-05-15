import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNB9K2ER1q5t5CItWkDQ9GxPEbjIfdhfY",
  authDomain: "krishi-ai-78ce3.firebaseapp.com",
  projectId: "krishi-ai-78ce3",
  storageBucket: "krishi-ai-78ce3.firebasestorage.app",
  messagingSenderId: "174780788122",
  appId: "1:174780788122:web:e6f0af08e36b115c649e23",
  measurementId: "G-XR01DVRJMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
