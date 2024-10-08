// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiBuTgGuSQpQSy-HuXWwS0zFywLPW_H8w",
  authDomain: "cafeapp-abee4.firebaseapp.com",
  projectId: "cafeapp-abee4",
  storageBucket: "cafeapp-abee4.appspot.com",
  messagingSenderId: "895530011833",
  appId: "1:895530011833:web:0a32220240cfb90c9fdf68",
  measurementId: "G-0WNERCPW2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const my_auth = getAuth(app);
export const db = getFirestore(app);


