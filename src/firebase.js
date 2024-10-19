// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";  // Comment this out

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

