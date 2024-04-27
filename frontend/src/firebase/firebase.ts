// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-69ea0.firebaseapp.com",
    projectId: "mern-blog-69ea0",
    storageBucket: "mern-blog-69ea0.appspot.com",
    messagingSenderId: "403225834033",
    appId: "1:403225834033:web:59355e7fd049fecfd1db10"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
