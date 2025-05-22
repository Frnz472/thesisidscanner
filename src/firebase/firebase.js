
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLZ3YCKtTNjJzM-1h1cSeqEuKYYODwxAo",
  authDomain: "stiidscanner-b8e8b.firebaseapp.com",
  projectId: "stiidscanner-b8e8b",
  storageBucket: "stiidscanner-b8e8b.firebasestorage.app",
  messagingSenderId: "881024085386",
  appId: "1:881024085386:web:9bc270dbc22d9011e2ac73",
  measurementId: "G-GX896CEYJ6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };