import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYjX3giT6xcyoOZdiTOCgVMu7YLCkdAew",
  authDomain: "seeker-5aa0a.firebaseapp.com",
  projectId: "seeker-5aa0a",
  storageBucket: "seeker-5aa0a.appspot.com",
  messagingSenderId: "832268631467",
  appId: "1:832268631467:web:ad52e1b1c34863292026ee",
  measurementId: "G-8LE0RDD8KF",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
