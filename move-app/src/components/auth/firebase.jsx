// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup , signOut} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwP1ygvwsMNL6IfvKsEtvlI4kYe68hwuw",
  authDomain: "movieapp-7ee24.firebaseapp.com",
  projectId: "movieapp-7ee24",
  storageBucket: "movieapp-7ee24.appspot.com",
  messagingSenderId: "617856561689",
  appId: "1:617856561689:web:7634da9992bd4dfbd13088",
  measurementId: "G-VVQ9PK92FY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const loginOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
}; 