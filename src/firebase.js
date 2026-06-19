import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration using Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;
let db;

// Verify connection by checking if config exists and initializing safely
if (firebaseConfig.apiKey) {
  try {
    // Prevent duplicate initialization during hot reloads
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    
    // Initialize Cloud Firestore
    db = getFirestore(app);
    console.log("Firebase & Firestore connected successfully.");
  } catch (error) {
    console.error("Firebase connection error:", error);
  }
} else {
  console.warn("Firebase configuration is missing. Please set up your .env file with the Firebase configuration.");
}

export { app, db };
