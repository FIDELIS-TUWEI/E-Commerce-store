import { addDoc, deleteDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { collection, doc } from 'firebase/firestore'
import { useState, useEffect } from 'react';
import { Box, Card, Container, Grid, IconButton, Link, Stack, Typography, useTheme } from '@mui/material';
import { PlaylistAddCircleOutlined } from '@mui/icons-material';
import { getProducts } from '../Firebase';

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
        addDoc(colRef, { name: newProduct, category: newCategory, price: Number(newPrice), image_url: image })
        console.log('submit')

    }

    // Update Item
    const updateItem = (id, price) => {
        // document collection
        const docRef = doc(db, "jumia_products", id)
        // Increment price
        const newPrice = { price: price + 1 }
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

    const theme = useTheme()

    return (
        <>
            <Container>
                <Grid mt={4} container columnSpacing={1} rowSpacing={3}>
                    {
                        products.map(product => {
                            const hasDiscount = product.old_price || (product.lower_old_price_limit && product.upper_old_price_limit)
                            return <Grid item xs={6} md={4} lg={3} key={product.id}>
                                <Card>
                                    <Stack>
                                        <Stack sx={{ position: "relative" }}>
                                            <img src={product.image_url} alt={product.name} />
                                            <IconButton color="primary" size="large" sx={{
                                                position: "absolute",
                                                bottom: 0,
                                                right: 0,
                                                backgroundColor: "#ffffff"
                                            }}
                                                aria-label="Add to catalog">
                                                <PlaylistAddCircleOutlined fontSize="inherit" />
                                            </IconButton>
                                        </Stack>

                                        <Box p={2}>
                                            <Typography variant="body2" sx={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                display: "-webkit-box",
                                                WebkitLineClamp: "1",
                                                WebkitBoxOrient: "vertical",
                                            }}> {product.name} </Typography>


                                            <Typography
                                                variant="body2"
                                                mt={1}
                                                sx={{
                                                    textDecoration: hasDiscount ? "line-through" : "none"
                                                }}
                                                textAlign={hasDiscount ? "left" : "right"}
                                                color={hasDiscount ? "inherit" : 'GrayText'}>
                                                {!hasDiscount ? "No Discount" : "Ksh " + product.old_price || product.lower_old_price_limit && product.upper_old_price_limit}
                                            </Typography>


                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="h6">Ksh {product.price}</Typography>
                                                <Box>
                                                    {
                                                        product.percentage_discount ?
                                                            <Typography
                                                                textAlign="center"
                                                                sx={{
                                                                    textDecoration: "line-through"
                                                                }}
                                                                color="primary"> {product.percentage_discount}%</Typography> :
                                                            <Box />
                                                    }
                                                </Box>
                                            </Stack>

                                            <Stack alignItems="center">
                                                <Link
                                                    href={product.url}
                                                    color="inherit"
                                                    underline="none"
                                                    target="blank"
                                                    rel="noreferrer">
                                                    View In Jumia
                                                </Link>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Card>
                            </Grid>
                        }
                        )
                    }
                </Grid>
            </Container>
        </>
    );
}

export default Products;
