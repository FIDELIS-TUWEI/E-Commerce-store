import firebase from './Firebase'
import { addDoc, getFirestore } from 'firebase/firestore';
import  { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import './App.css'
import Form from './components/Form';


const App = () => {
  // useState
  const [data, setData] = useState([])

  // Init services
  const db = getFirestore()

  // Collect ref
  const colRef = collection(db, "jumia_products");

  // getDocs collection with useEffect
  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let products = []
        snapshot.docs.forEach((doc) => {
          products.push({...doc.data(), id: doc.id})
        })
        setData(products)
        console.log(products)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // form function
  const addProduct = e => {
    e.preventDefault()
    console.log("check")
  }
  

  return ( 
    <div className="App">
      <Nav />

      {data.map((item) => {
        return (
          <div key={item.id} className="container">

            <div className='product__container'>
              <h2>Product name: {item.name}</h2>
              <p>Category: {item.category}</p>
              <div className='image__container'>
                <img src={item.image_url} />
              </div>
              <h3>Ksh. {item.price}/=</h3>
              <a href={item.url} target="_blank">Buy Item</a>
            </div>
          </div>
        )
      })}

      <Form add={addProduct}/>
    </div>
   );
}
 
export default App;
