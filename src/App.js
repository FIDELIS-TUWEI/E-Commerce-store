import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import './App.css'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Products from './pages/Products'
import Account from './pages/Account'
import Error from './pages/Error'
import { AuthContextProvider } from './context/AuthContext'

// layout
import RootLayout from './layouts/RootLayout';


// router
const router = createBrowserRouter(
  createRoutesFromElements(
    <AuthContextProvider>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='products' element={<Products />} />
        <Route path='account' element={<Account />} />
        <Route path="*" element={<Error />} />
      </Route>
    </AuthContextProvider>
  )
)

const App = () => {
  return ( 
    <div className="App">
      <RouterProvider router={router} />
    </div>
   );
}
 
export default App;
