// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export default app