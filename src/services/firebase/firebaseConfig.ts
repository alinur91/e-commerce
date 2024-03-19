// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8BOiyfErfWkqQ1iY9czmx_Gu86kdmQxk",
  authDomain: "e-commerce-a2134.firebaseapp.com",
  projectId: "e-commerce-a2134",
  storageBucket: "e-commerce-a2134.appspot.com",
  messagingSenderId: "999764307523",
  appId: "1:999764307523:web:2ca8f42ff48e951aff6ef6",
  measurementId: "G-C0EX678N2B",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
