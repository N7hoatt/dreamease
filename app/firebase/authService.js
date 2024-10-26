// src/firebase/authService.js
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";
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
// const {setUserId} = useUser();

// Function to create a user with a unique device ID
export const createUserWithDeviceID = async () => {
  try {
    const deviceId = await DeviceInfo.getUniqueId();
    const userCredential = await signInAnonymously(auth);
    const userId = userCredential.user.uid;
    console.log(userId);

    // Create a new user document with userId and deviceId
    await setDoc(doc(db, "users", userId), {
      userId,
      deviceId,
      createdAt: new Date().toISOString(),
    });

    // Automatically create initial sleepDate and sleepSection subcollections for the new user
    await initializeUserSleepData(userId);

    console.log("User created with ID:", userId);
    return userId;  // Return the userId for further use
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};

// Function to initialize user's sleep data
const initializeUserSleepData = async (userId) => {
  try {
    const DEFAULT_HOUR = 12;
    const DEFAULT_MINUTE = 0;

    // Set date to DEFAULT_HOUR and DEFAULT_MINUTE, then convert to ISO string
    const initialDate = new Date();
    initialDate.setHours(DEFAULT_HOUR, DEFAULT_MINUTE, 0, 0);
    const dateIsoString = initialDate.toISOString();

    // Create a new document in the sleepDate subcollection
    await addDoc(collection(db, `users/${userId}/sleepDate`), {
      userId,  // Ensure userId is saved in sleepDate document
      date: dateIsoString,
      duration: 0,
    });

    // Placeholder values for initial sleep section data
    await addDoc(collection(db, `users/${userId}/sleepSection`), {
      userId,  // Ensure userId is saved in sleepSection document
      startTime: dateIsoString,
      endTime: dateIsoString,
      duration: 0,
    });

    console.log("Initial sleep data created for user ID:", userId);
  } catch (error) {
    console.error("Error initializing sleep data:", error);
  }
};
