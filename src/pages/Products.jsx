import firebase, { getProducts } from '../Firebase'
import { addDoc, deleteDoc, getFirestore, updateDoc } from 'firebase/firestore';
import  { collection, doc } from 'firebase/firestore'
import { useState, useEffect } from 'react';
import Form from './Form'

const Products = () => {
    // useState
    const [products, setProducts] = useState([])
    const [lastVisibleProduct, setLastVisibleProduct] = useState(null)
    const [newProduct, setNewProduct] = useState("")
    const [newCategory, setNewCategory] = useState("")
    const [newPrice, setNewPrice] = useState(0);
    const [image, setImage] = useState("")

    const fetchProducts = async () => {
        const result = await getProducts(lastVisibleProduct)
        setProducts([...products, ...result["products"]])
        setLastVisibleProduct(result["lastVisible"])
    }

    // Init services
    const db = getFirestore()

    // Collect ref
    const colRef = collection(db, "jumia_products");

    // realtime data collection with useEffect
    useEffect(() => {
        fetchProducts()
    }, []);

    
    // Add New Product function
    const addProduct = (e) => {
        e.preventDefault()
        addDoc(colRef, {name: newProduct, category: newCategory, price: Number(newPrice), image_url: image })
    }

    return ( 
        <>
            <div className='container'>
            <Form
                addProduct={addProduct}
                setNewProduct={setNewProduct}
                setNewCategory={setNewCategory}
                setNewPrice={setNewPrice}
                setImage={setImage}
            />

            <div id="catalog">
                {products.map((item) => {
                    return (
                        <section key={item.id} className="prd">
                                <div className='image__container'>
                                    <img src={item.image_url} alt="" className='image' />
                                </div>

                                <div className='item__description'>
                                    <h5>Brand: {item.name}</h5>
                                    { item.jumia_express ? <i className='jumia__express'>Jumia Express</i> : null }
                                    <p className='price'> Ksh. {item.price}/= </p>
                                    <span><a href={item.url} target="_blank" className='buy__item'>Buy item</a></span>
                                    
                                </div>           
                        </section>
                    )
                })}
            </div>
            <button onClick={fetchProducts} className="load__more">Load More</button>
            </div>
        </>
    );
}
 
export default Products;
