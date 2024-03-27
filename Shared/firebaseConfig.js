// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "qonnect-project.firebaseapp.com",
  projectId: "qonnect-project",
  storageBucket: "qonnect-project.appspot.com",
  messagingSenderId: "481863349370",
  appId: "1:481863349370:web:1d877fb71f809a6ea577c3",
  measurementId: "G-Y0BQ9FPLNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};