// src/firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCgPcWzvOER7dn3bML5RKsFG9WGRw-VOtY",
    authDomain: "real-time-chat-app-3e95a.firebaseapp.com",
    projectId: "real-time-chat-app-3e95a",
    storageBucket: "real-time-chat-app-3e95a.firebasestorage.app",
    messagingSenderId: "402918287989",
    appId: "1:402918287989:web:f3d37533130e44e385263c",
    measurementId: "G-PLBWHP7F17"
};

export const app = initializeApp(firebaseConfig);