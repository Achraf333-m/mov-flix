// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCffnvsiIAoQKg1YpjKroA0O64mMXKbivw",
  authDomain: "movieflix-2e284.firebaseapp.com",
  projectId: "movieflix-2e284",
  storageBucket: "movieflix-2e284.appspot.com",
  messagingSenderId: "987480369823",
  appId: "1:987480369823:web:2a45ac743f0a35a65510aa",
  measurementId: "G-2897GSG358"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth()


export {auth}