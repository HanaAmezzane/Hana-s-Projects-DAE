import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPLlQqNmz72lsKIlOTEq0L-Igwy2GBbkk",
  authDomain: "voices-of-resilience.firebaseapp.com",
  projectId: "voices-of-resilience",
  storageBucket: "voices-of-resilience.firebasestorage.app",
  messagingSenderId: "390688720763",
  appId: "1:390688720763:web:ac21c3f002675c42c19fde",
  measurementId: "G-J6P1SV3S7M"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);  // Added this line for Authentication

export { db, storage, auth };

