const Form = ({addProduct, setNewProduct, setNewCategory, setNewPrice, setImage}) => {
    return ( 
        <>
            <div className='form__container' id='form'>
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
        
                    <label>Image Url</label>
                    <input
                    type="text"
                    placeholder="Enter image URL
                    onChange={(e) => setImage(e.target.value)}
                    />

                    <button type='submit' className='btn'>Add Item</button>
                </form>
            </div>
        </>
     );
}
 
export default Form;
