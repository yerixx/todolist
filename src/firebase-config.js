// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUtZSAff40fbTwtP9fGxtrE8HsCRMxR-c",
  authDomain: "todolist-aac99.firebaseapp.com",
  projectId: "todolist-aac99",
  storageBucket: "todolist-aac99.firebasestorage.app",
  messagingSenderId: "112377043693",
  appId: "1:112377043693:web:e70c8a669afbc6db1b4ae4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
