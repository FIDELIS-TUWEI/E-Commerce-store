import firebase from './Firebase'
import { addDoc, deleteDoc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore';
import  { collection, doc } from 'firebase/firestore'
import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import './App.css'


const App = () => {
  // useState
  const [data, setData] = useState([])
  const [newProduct, setNewProduct] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [newPrice, setNewPrice] = useState(0);

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
  const addProduct = (e) => {
    e.preventDefault()
    addDoc(colRef, {name: newProduct, category: newCategory, price: Number(newPrice) })
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

  // Delete Item
  const deleteItem = (id) => {
    // document collection
    const docRef = doc(db, "jumia_products", id)
    // delete item according to id
    deleteDoc(docRef)
  }

  return ( 
    <div className="App">
      <Nav />
      <div className='form__container'>
          <form onSubmit={addProduct} className="form">
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

            <label>Price:</label>
            <input
              type='number'
              placeholder='Price'
              onChange={(e) => setNewPrice(e.target.value)}
            />

            <button type='submit' className='btn'>Add Item</button>
          </form>
      </div>
      

      {data.map((item) => {
        return (
          <section key={item.id} className="container">
            <small>Category: {item.category}</small>

            <div className='product__container'>
              <div className='image__container'>
                <img src={item.image_url} alt="" className='image' />
              </div>

              <div className='item__description'>
                <h5>Brand: {item.name}</h5>
            
                <p className='price'>
                  Ksh. {item.price}/= 
                  <span><a href={item.url} target="_blank" className='buy__item'>Buy Item</a></span>
                </p>
                
              
                <div className='buttons'>
                  <button
                    className='btn'
                    onClick={() => {updateItem(item.id, item.price)}}
                  >
                    Update Price
                  </button>

                  <button
                    className='btn'
                    onClick={() => {deleteItem(item.id)}}
                  >
                    Delete Item
                  </button>
                </div>
              </div>           
            </div>
          </section>
        )
      })}

    </div>
   );
}
 
export default App;
