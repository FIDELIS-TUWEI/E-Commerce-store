import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import './App.css'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Products from './pages/Products'
import Account from './pages/Account'
import Error from './pages/Error'
import ProtectedRoute from './pages/ProtectedRoute'

// layout
import RootLayout from './layouts/RootLayout';


// router
const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='products' element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
          }
        />
        <Route path='account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="*" element={<Error />} />
      </Route>
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
