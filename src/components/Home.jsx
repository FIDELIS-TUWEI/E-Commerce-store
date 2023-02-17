import Firebase from '../firebase'

const Home = () => {
    return ( 
        <>
            <div>
                <h2>Fleekyffect Firestore Database</h2>

                <form className="add">
                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" required />

                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" required />

                    <label htmlFor="image">Image-Url</label>
                    <input type="text" name="image" required />

                    <button type='submit'>Add Product</button>

                </form>

                <form className='delete'>
                    <label htmlFor="id">Product ID:</label>
                    <input type="text" name="id" required />

                    <button type='submit'>Delete Product</button>
                </form>
            </div>
            <Firebase />
        </>
     );
}
 
export default Home;