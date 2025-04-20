import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import {Toaster} from "react-hot-toast";
import Footer from './components/Footer';
import { useAppContext } from './Context/Appcontext';
import Login from './components/Login';
import Allproducts from './Pages/Allproducts';
import ProductCategory from './Pages/ProductCategory';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import AddAddress from './Pages/AddAddress';
import MyOrders from './Pages/MyOrders';
import SellerLogin from './components/Seller/SellerLogin';
import SellerLayout from './Pages/Seller/SellerLayout';
import AddProduct from './Pages/Seller/AddProduct';
import ProductList from './Pages/Seller/ProductList';
import Order from './Pages/Seller/Order';
import Loading from './Pages/Loading';

const App = () => {
  const isSellerPath = useLocation().pathname.includes('seller');
  const {showUserLogin,isSeller}=useAppContext();
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
        {isSellerPath ? null : <Navbar/>}
        {showUserLogin ? <Login/> : null}
        <Toaster/>
        <div className={`${isSellerPath ? "":"px-6 md:px-16 lg:px-24 xl:px-32"} `}>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/products' element={<Allproducts/>} />
            <Route path='/products/:category' element={<ProductCategory/>} />
            <Route path='/products/:category/:id' element={<ProductDetails/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/addAddress' element={<AddAddress/>}/>
            <Route path='/my-orders' element={<MyOrders/>}/>
            <Route path='/loader' element={<Loading/>}/>
            <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>} >
               <Route index element={isSeller ? <AddProduct/> : null} />
               <Route path='product-list' element={<ProductList/>} />
               <Route path='orders' element={<Order/>} />
            </Route>
          </Routes>
        </div>
        {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App
