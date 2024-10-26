// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmgdti_T5cYVNb-_Z6ABeJ9DMXmWzLC3s",
  authDomain: "dreamease-b662d.firebaseapp.com",
  projectId: "dreamease-b662d",
  storageBucket: "dreamease-b662d.appspot.com",
  messagingSenderId: "233002680039",
  appId: "1:233002680039:web:0fd60849b1ce6c94522c42"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const db = getFirestore(FIREBASE_APP);