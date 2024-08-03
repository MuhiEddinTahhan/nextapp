// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4ESjR2rO4f0oOMsakepqeqxv1y14dfJ0",
  authDomain: "expense-tracker-e3a92.firebaseapp.com",
  projectId: "expense-tracker-e3a92",
  storageBucket: "expense-tracker-e3a92.appspot.com",
  messagingSenderId: "626752596697",
  appId: "1:626752596697:web:11423b67de94f74df3ecc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);