import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { collection, getFirestore, query, getDocs, orderBy, limit, startAfter } from "firebase/firestore";

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
const db = getFirestore();

// getAuth
export const auth = getAuth();

// get products
export async function getProducts(lastVisible){
  const productsCollectionRef = collection(db, "jumia_products")
  let q = null
  if(lastVisible){
    q = query(productsCollectionRef, orderBy("timestamp_entered", "desc"), limit(20), startAfter(lastVisible))
  }else{
    q = query(productsCollectionRef, orderBy("timestamp_entered", "desc"), limit(20))
  }

  const snapshot = await getDocs(q)
  const products = snapshot.docs.map(doc => {
    return {...doc.data(), id: doc.id}
  })
  if(products.length > 0){
    lastVisible = snapshot.docs[snapshot.docs.length-1]
  }
  return {products, lastVisible}
}