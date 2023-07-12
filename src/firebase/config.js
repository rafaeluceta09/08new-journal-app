// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWMXBi4ECi5Cvxnsni8SfmxpbeoosW2ms",
    authDomain: "journal-app-86491.firebaseapp.com",
    projectId: "journal-app-86491",
    storageBucket: "journal-app-86491.appspot.com",
    messagingSenderId: "797899227601",
    appId: "1:797899227601:web:cc74512e235f8886eee0f0"
  };

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirestoreDB = getFirestore(FirebaseApp);
