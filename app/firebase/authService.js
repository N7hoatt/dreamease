// src/firebase/authService.js
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import DeviceInfo from "react-native-device-info";

const firebaseConfig = {
  apiKey: "AIzaSyDmgdti_T5cYVNb-_Z6ABeJ9DMXmWzLC3s",
  authDomain: "dreamease-b662d.firebaseapp.com",
  projectId: "dreamease-b662d",
  storageBucket: "dreamease-b662d.appspot.com",
  messagingSenderId: "233002680039",
  appId: "1:233002680039:web:0fd60849b1ce6c94522c42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const createUserWithDeviceID = async () => {
  try {
    const deviceId = await DeviceInfo.getUniqueId();
    const userCredential = await signInAnonymously(auth);
    const userId = userCredential.user.uid;

    await setDoc(doc(db, "users", userId), {
      userId,
      deviceId,
      createdAt: new Date().toISOString(),
    });

    console.log("User created with ID:", userId);
    return userId;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
