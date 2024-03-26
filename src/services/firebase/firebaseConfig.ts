import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";

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
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const storage = getStorage();
