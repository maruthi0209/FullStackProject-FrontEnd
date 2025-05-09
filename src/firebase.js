// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0BzVy1GKY1IXa8nmTz7tagRJ5Qz-v4b8",
  authDomain: "screenscore-7e189.firebaseapp.com",
  projectId: "screenscore-7e189",
  storageBucket: "screenscore-7e189.firebasestorage.app",
  messagingSenderId: "818415215094",
  appId: "1:818415215094:web:99ae37da7957740c9967d7",
  measurementId: "G-J4KFTE7H69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };