import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import './App.css'

// pages
import Products from './pages/Products'
import Error from './pages/Error'

// layout
import RootLayout from './layouts/RootLayout';
import { ThemeProvider } from '@mui/material';
import {theme} from './theme';


// router
const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='products' element={<Products />} />
        <Route path="*" element={<Error />} />
      </Route>
  )
)

const App = () => {
  return ( 
    <div className="App">
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
   );
}
 
export default App;
