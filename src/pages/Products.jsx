import { useState, useEffect } from 'react';
import { 
    Box, Button, Card, 
    CircularProgress, Container, 
    Grid, IconButton, Link, Stack, 
    Typography, useTheme 
} from '@mui/material';
import { PlaylistAddCircleOutlined } from '@mui/icons-material';
import { auth, getProducts } from '../Firebase';
import { useNavigate } from 'react-router-dom';


const Products = () => {
    // useState
    const [products, setProducts] = useState([])
    const [isLoadingProducts, setIsLoadingProducts] = useState(false)
    const [lastVisibleProduct, setLastVisibleProduct] = useState(null)

    //useNavigate
    const navigate = useNavigate()

    const fetchProducts = async () => {
        setIsLoadingProducts(true)
        const result = await getProducts(lastVisibleProduct)
        setProducts([...products, ...result["products"]])
        setLastVisibleProduct(result["lastVisible"])
        setIsLoadingProducts(false)
    }

    // realtime data collection with useEffect & authtoken check
    useEffect(() => {
        fetchProducts();
        // authtoken check
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken) {
            navigate('/products')
        }
        // failed authtoken check
        if (!authToken) {
            navigate('/login')
        }
    }, []);

    const theme = useTheme()

    // handlelogout
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token')
        navigate('/login')
    }

    return (
            <Container>
                <button onClick={handleLogout} className="logout__btn">Logout</button>
                <Grid mt={4} container columnSpacing={3} rowSpacing={3}>
                    {
                        products.map(product => {
                            const hasDiscount = product.old_price || (product.lower_old_price_limit && product.upper_old_price_limit)
                            return <Grid item xs={6} md={4} lg={3} key={product.id}>
                                <Card>
                                    <Stack>
                                        <Stack sx={{ position: "relative" }}>
                                            <img src={product.image_url} alt={product.name} loading='lazy' />
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

                {
                    isLoadingProducts ?
                        <Stack alignItems="center" py={5}>
                            <CircularProgress />
                        </Stack> :
                        products.length != 0 ?
                        <Stack 
                            mt={2}
                            py={3} 
                            alignItems="center" 
                            sx={{
                                cursor: "pointer",
                            }} 
                            onClick={fetchProducts}>
                            <Button variant="contained">Load More</Button>
                        </Stack>: <></>
                }
            </Container>
    );
}

export default Products;
