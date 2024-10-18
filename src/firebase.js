// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWQPUOzhnxy_7-4df6dcqRrQ5Pl2MQO7E",
  authDomain: "tastebuddy-151f4.firebaseapp.com",
  projectId: "tastebuddy-151f4",
  storageBucket: "tastebuddy-151f4.appspot.com",
  messagingSenderId: "995755226636",
  appId: "1:995755226636:web:2da0311c73d6a62b252029",
  measurementId: "G-9N5WNYHWSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and set up Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
