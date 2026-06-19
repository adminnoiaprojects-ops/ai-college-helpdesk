import { loadEnv } from 'vite';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, limit, query } from 'firebase/firestore';

const env = loadEnv('development', process.cwd(), '');

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

console.log("1. Checking Environment variables loaded from .env:");
let hasErrors = false;
for (const [key, value] of Object.entries(firebaseConfig)) {
  if (!value) {
    console.error(`❌ Missing variable: ${key}`);
    hasErrors = true;
  }
}
if (!hasErrors) {
  console.log("✅ All required environment variables are present.");
  console.log("Loaded Config:", {
    ...firebaseConfig,
    apiKey: firebaseConfig.apiKey ? "***" + firebaseConfig.apiKey.slice(-4) : "MISSING"
  });
}

try {
  const app = initializeApp(firebaseConfig);
  console.log("2. Firebase initialized successfully: ✅");
  
  const db = getFirestore(app);
  
  console.log("3. Testing Firestore connection...");
  const q = query(collection(db, "_verification_test_"), limit(1));
  await getDocs(q).then(() => {
     console.log("✅ Firestore connection is available (Read successful)");
  }).catch(e => {
     if(e.code === 'permission-denied') {
        console.log("✅ Firestore connection is available (Permission denied by security rules, which confirms the database is reachable)");
     } else {
        console.error("❌ Firestore connection failed:", e.message);
     }
  });

} catch (error) {
  console.error("❌ Firebase initialization failed:", error.message);
}
