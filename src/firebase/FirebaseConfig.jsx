// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDxvmpunYCnrV8qXGGwLskv0UP4iZJF628",
  authDomain: "online-crackers-1634.firebaseapp.com",
  projectId: "online-crackers-1634",
  storageBucket: "online-crackers-1634.firebasestorage.app",
  messagingSenderId: "274275022431",
  appId: "1:274275022431:web:7266f48dc2d315d2828dea",
  measurementId: "G-C3XX0XNZM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
export const fireDb = getFirestore(app);
export const auth = getAuth(app);