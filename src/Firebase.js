import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsLoBiTYPq-305XSzfN0DbZpfoC4bHfCc",
  authDomain: "fleekyffect.firebaseapp.com",
  projectId: "fleekyffect",
  storageBucket: "fleekyffect.appspot.com",
  messagingSenderId: "290744464462",
  appId: "1:290744464462:web:d76f511b14d24ba37e7f1f",
  measurementId: "G-5DJBGRB05D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);