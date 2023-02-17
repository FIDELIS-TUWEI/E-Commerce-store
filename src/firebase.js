import { initializeApp } from "firebase/app";
import {
    collection,
    getDocs,
    getFirestore 
} from 'firebase/firestore'

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
initializeApp(firebaseConfig);

// init services
const db = getFirestore()


//collection ref
const colRef = collection(db, "jumia_products")


//get collection data
getDocs(colRef)
    .then((snapshot) => {
        console.log(snapshot.docs)
    })