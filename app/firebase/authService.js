// // src/firebase/authService.js
// import { initializeApp } from "firebase/app";
// import { getAuth, signInAnonymously } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore";
// import DeviceInfo from "react-native-device-info";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// export const createUserWithDeviceID = async () => {
//   try {
//     const deviceId = await DeviceInfo.getUniqueId();
//     const userCredential = await signInAnonymously(auth);
//     const userId = userCredential.user.uid;

//     await setDoc(doc(db, "users", userId), {
//       userId,
//       deviceId,
//       createdAt: new Date().toISOString(),
//     });

//     console.log("User created with ID:", userId);
//     return userId;
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error;
//   }
// };
