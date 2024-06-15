// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYwZDCHTUMqVUYXcPDgl2UoJvbEakGvBM",
  authDomain: "eclipze-fc736.firebaseapp.com",
  projectId: "eclipze-fc736",
  storageBucket: "eclipze-fc736.appspot.com",
  messagingSenderId: "985241189615",
  appId: "1:985241189615:web:fa1433e720fd8788356f1a",
  measurementId: "G-YPNW0QDEHQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);