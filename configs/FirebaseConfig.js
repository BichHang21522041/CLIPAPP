// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import * as firebase from "firebase"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
// import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0RCuKL_bEV2i7giDN-vCSkW6_TjjOMME",
    authDomain: "image-clip-bc780.firebaseapp.com",
    projectId: "image-clip-bc780",
    storageBucket: "image-clip-bc780.appspot.com",
    messagingSenderId: "1056168020087",
    appId: "1:1056168020087:web:c7881a6a6233ca4074de72",
    measurementId: "G-5SR6803JPJ"
};

// Initialize Firebase
// export  const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};