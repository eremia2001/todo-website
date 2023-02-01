// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQvMf6frdK3UftFlFflUgS2eIJSF-RuEw",
  authDomain: "todo-app-4bf06.firebaseapp.com",
  projectId: "todo-app-4bf06",
  storageBucket: "todo-app-4bf06.appspot.com",
  messagingSenderId: "552511041541",
  appId: "1:552511041541:web:41ba74bdf261dad5916c6c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
