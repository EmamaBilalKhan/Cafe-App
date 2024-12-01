import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBiBuTgGuSQpQSy-HuXWwS0zFywLPW_H8w",
  authDomain: "cafeapp-abee4.firebaseapp.com",
  projectId: "cafeapp-abee4",
  storageBucket: "cafeapp-abee4.appspot.com",
  messagingSenderId: "895530011833",
  appId: "1:895530011833:web:0a32220240cfb90c9fdf68",
  measurementId: "G-0WNERCPW2F",
};


let app, auth;
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

const db = getFirestore(app);
export {auth , db}

