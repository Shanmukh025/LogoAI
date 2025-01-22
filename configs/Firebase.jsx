// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE_API_KEY,
    authDomain: "logoai-gen43.firebaseapp.com",
    projectId: "logoai-gen43",
    storageBucket: "logoai-gen43.firebasestorage.app",
    messagingSenderId: "461098809116",
    appId: "1:461098809116:web:e85b2695194e8d06ee2cd9",
    measurementId: "G-TF7567HEZZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
