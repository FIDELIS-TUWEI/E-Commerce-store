const Form = ({addProduct}) => {
    return ( 
        <div>
            <form className="add" onSubmit={addProduct}>
                <label htmlFor="nameProduct">Name</label>
                <input type="text" name="nameProduct" required />
                <label htmlFor="category">Category</label>
                <input type="text" name="category" required />
                <label htmlFor="id">Product ID</label>
                <input type="text" name="productID" />

                <button type="submit">Add to Store</button>
            </form>
        </div>
     );
}
 
export default Form;