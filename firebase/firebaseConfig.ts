import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyByoOqiNruxkYJg_saRuuu1YXQ64zkL3c0",
  authDomain: "studysprout-bcbe3.firebaseapp.com",
  projectId: "studysprout-bcbe3",
  storageBucket: "studysprout-bcbe3.firebasestorage.app",
  messagingSenderId: "1066002781876",
  appId: "1:1066002781876:web:0dad13eae9e309057fa9e1",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);

// Export Authentication service
export const auth = getAuth(app);

export default app;
