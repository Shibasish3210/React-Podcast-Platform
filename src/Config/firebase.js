// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {  getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdFNJ6PPQ5Ontnrdr0m4OES7xlQOnzVE0",
  authDomain: "podcast-platform-f5.firebaseapp.com",
  projectId: "podcast-platform-f5",
  storageBucket: "podcast-platform-f5.appspot.com",
  messagingSenderId: "1004881481972",
  appId: "1:1004881481972:web:0624e4b66dda8f06afcea1",
  measurementId: "G-WGZSJWPZYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };