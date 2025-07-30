// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqhytlatLO1bDbyvKCsUqjWuwx_SZqaok",
  authDomain: "netflixgpt-ce5b8.firebaseapp.com",
  projectId: "netflixgpt-ce5b8",
  storageBucket: "netflixgpt-ce5b8.firebasestorage.app",
  messagingSenderId: "1083284736153",
  appId: "1:1083284736153:web:785436dd09fe1eb621d008"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
