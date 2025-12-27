// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhJe04K41AxJwDcnlRQXyg8ZCDy6-y800",
  authDomain: "minimal-shoppingapp.firebaseapp.com",
  projectId: "minimal-shoppingapp",
  storageBucket: "minimal-shoppingapp.firebasestorage.app",
  messagingSenderId: "93332794126",
  appId: "1:93332794126:web:87b7added9786e2257c55f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);