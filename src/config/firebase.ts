// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};
// Your web app's Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyA-mctoWn7VmZBSWOmLyHaZnaxklpieMUY",
  authDomain: "chat-app-577ed.firebaseapp.com",
  projectId: "chat-app-577ed",
  storageBucket: "chat-app-577ed.appspot.com",
  messagingSenderId: "97188729328",
  appId: "1:97188729328:web:f1bf976782d6154c218d35",
  measurementId: "G-W63EYXTEQ0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();
