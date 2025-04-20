import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL from env:", import.meta.env.VITE_BACKEND_URL);

export const AppContext =createContext();

export const AppContextProvider = ({children})=>{

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate= useNavigate();
    const[user,setUser]=useState(null);
    const[isSeller,setIsSeller]=useState(false);
    const[showUserLogin,setShowUserLogin]=useState(false);  
    const[products, setProducts]=useState([]);
    const[cartItems, setCartItems]=useState({});
    const[searchQuery, setSearchQuery]=useState({});

 //Fetch Seller Status
  const fetchSeller = async()=>{
    try {
        const{data} = await axios.get('api/seller/is-auth');
        if(data.success){
            setIsSeller(true);
        }else{
            setIsSeller(false)
        }
    } catch (error) {
        setIsSeller(false)
        console.log(error);
    }
  }
  //Fetch User auth status , User data and cart Items
   
    const fetchUser = async()=>{
        try {
            const{data}= await axios.get('/api/user/is-auth', {withCredentials: true});
            if(data.success){
                setUser(data.user);
                setCartItems(data.user.cartItems)
            }
        } catch (error) {
            setUser(null);
            console.log(error)
        }
    }  
  
//Fetch all products
    const fetchProducts=async()=>{
       try {
        const {data} = await axios.get('/api/product/list')
        if(data.success){
            setProducts(data.products)
        }else{
            toast.error(data.message)
        }
       } catch (error) {
        toast.error(error.message)
       }
    }
// Add product to cart
 const addToCart = (itemId)=>{
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
        cartData[itemId]+= 1;
    }else{
        cartData[itemId]= 1;
    }
    setCartItems(cartData);
    toast.success('Add to cart');
 }
 //update cart items quantity
 const updateCartItem = (itemId, quantity)=>{
    let cartData= structuredClone(cartItems);
    cartData[itemId]=quantity;
    setCartItems(cartData);
    toast.success("Cart updated")
 }
 //Remove Product from cart
 const removeFromCart=(itemId)=>{
   let cartData = structuredClone(cartItems);
   if(cartData[itemId]){
    cartData[itemId] -=1;
    if(cartData[itemId]===0){
        delete cartData[itemId];
    }
   }
   toast.success("Remove from cart");
   setCartItems(cartData);
 }
 const getCartCount = () =>{
    let totalCount = 0;
    for(const item in cartItems){
        totalCount += cartItems[item];
    }
    return totalCount;
 }
 // get cart total Amount
 const getCartAmount = ()=>{
    let totalAmount = 0;
    for(const items in cartItems){
        let itemInfo =products.find((product)=>product._id === items);

        if(cartItems[items]> 0 ){
            totalAmount += itemInfo.offerPrice*cartItems[items]
         }
    }
   
    return Math.floor(totalAmount*100)/100;
 }
    useEffect(()=>{
        fetchUser()
        fetchProducts()
        fetchSeller()
        
    },[])
//update database cart items

useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post('/api/cart/update', {
          userId: user._id,
          cartItems: cartItems
        });
        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
  
    if (user) {
      updateCart();
    }
  }, [cartItems]);

  useEffect(() => {
    const getCartFromDB = async () => {
      try {
        const { data } = await axios.get(`/api/cart/${user._id}`);
        if (data.success) {
          setCartItems(data.cartItems); // Set cart from database
        }
      } catch (error) {
        toast.error("Could not load cart");
        console.log(error.message);
      }
    };
  
    if (user) {
      getCartFromDB();
    }
  }, [user]);
  

    const value={navigate, user, setUser, isSeller, setIsSeller, showUserLogin, 
        setShowUserLogin, products, currency,addToCart, updateCartItem, removeFromCart, cartItems,
        getCartAmount, searchQuery, setSearchQuery, getCartCount, axios, fetchProducts, setCartItems}
    
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext=()=>{
    return useContext(AppContext);
}