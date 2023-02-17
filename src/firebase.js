import { initializeApp } from "firebase/app";
import {
    collection,
    getDocs,
    getFirestore 
} from 'firebase/firestore'

const Firebase = () => {
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
              let jumia_products = []
              snapshot.docs.forEach((doc) => {
                jumia_products.push({...doc.data, id: doc.id})
              })
              console.log(jumia_products)
          })
          .catch(err => {
            console.log(err.message)
          })



    return (
        <div></div>
    )
}




export default Firebase;