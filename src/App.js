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


  // useEffect
  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let products = []
        snapshot.docs.forEach((doc) => {
          products.push({...doc.data(), id: doc.id})
        })
        setData(products);
        console.log(products)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, []);

      
  return (
    <div className="App">
      {data.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.category}</p>
          <img src={item.image_url} alt={item.name} />
          <p>Brand: {item.data_brand}</p>
          <h4>Ksh. {item.price}/=</h4>
          <a href={item.url} target="_blank">Purchase</a>
        </div>
      ))}
    </div>
  );
}

export default App;
