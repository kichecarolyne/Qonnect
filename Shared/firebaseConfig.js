// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "next-project-94cf0.firebaseapp.com",
  projectId: "next-project-94cf0",
  storageBucket: "next-project-94cf0.appspot.com",
  messagingSenderId: "703180456634",
  appId: "1:703180456634:web:7381ef924810fa97afb883",
  measurementId: "G-9GPM11RLPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app