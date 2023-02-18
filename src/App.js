import firebase from './Firebase'
import { addDoc, deleteDoc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore';
import  { collection, doc } from 'firebase/firestore'
import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import './App.css'
import { async } from '@firebase/util';


const App = () => {
  // useState
  const [data, setData] = useState([])
  const [newProduct, setNewProduct] = useState("")
  const [newCategory, setNewCategory] = useState("")

  // Init services
  const db = getFirestore()

  // Collect ref
  const colRef = collection(db, "jumia_products");

  // realtime data collection with useEffect
  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      let products = []
      snapshot.docs.forEach((doc) => {
        products.push({...doc.data(), id: doc.id})
      })
      setData(products)
      console.log(products)
    })
  }, []);

  

  // Add New Product function
  const addProduct = () => {
    addDoc(colRef, {name: newProduct, category: newCategory})
  }

  // Update Item
  const updateItem = (id, price) => {
    // document collection
    const docRef = doc(db, "jumia_products", id)
    // Increment price
    const newPrice = {price: price + 1}
    //update price
    updateDoc(docRef, newPrice)
  }

  return ( 
    <div className="App">
      <Nav />

      <form onSubmit={addProduct}>
        <label>Product Name:</label>
        <input 
          type="text"
          placeholder='New Product'
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <label>Category:</label>
        <input
          type='text'
          placeholder='Category'
          onChange={(e) => setNewCategory(e.target.value)}
        />

        <button type='submit'>Add Item</button>
      </form>

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

              <button
                onClick={() => {updateItem(item.id, item.price)}}
              >
                Update Price
              </button>
            </div>
          </div>
        )
      })}

    </div>
   );
}
 
export default App;
