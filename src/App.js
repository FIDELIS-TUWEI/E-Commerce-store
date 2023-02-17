import firebase from './firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

import { useState, useEffect } from 'react';

const App = () => {
  // Init Services
  const db = getFirestore();

  // Collection ref
  const colRef = collection(db, "jumia_products")
  console.log(colRef)

  // useState
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  // function to get data
  getDocs(colRef)
      .then((snapshot) => {
          let jumia_products = []
          snapshot.docs.forEach((doc) => {
            jumia_products.push({...doc.data(), id: doc.id})
          })
          console.log(jumia_products)
          setData(jumia_products)
          //setLoader(false)
      })
      .catch(err => {
        console.log(err.message)
      });


  return (
    <div className="App">
      {data.map((item) => (
        <div key={item.id}>
          <h1>{item.category}</h1>
          <img src={item.image_url} />
        </div>
      ))}
    </div>
  );
}

export default App;
