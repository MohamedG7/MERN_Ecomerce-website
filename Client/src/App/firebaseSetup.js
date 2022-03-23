import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOyelwDH9Pj6TjeBVyMW2sVT02QkkFvo8",
  authDomain: "mernprojects-33a65.firebaseapp.com",
  projectId: "mernprojects-33a65",
  storageBucket: "mernprojects-33a65.appspot.com",
  messagingSenderId: "47428757522",
  appId: "1:47428757522:web:d81a457d8dd37424cd10cb",
  measurementId: "G-GW8RWFRCL7"
};

const app = initializeApp(firebaseConfig),
      analytics = getAnalytics(app),
      auth = getAuth(),
      provider = new GoogleAuthProvider(),
      db = getFirestore(app),
      storage = getStorage(app);

export {
    auth,
    provider,
    db,
    storage
}