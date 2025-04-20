import React, { useEffect, useState } from 'react'
import { useAppContext } from '../Context/Appcontext'
import Productcard from '../components/Productcard';

const Allproducts = () => {

    const{products, searchQuery}=useAppContext();
    const [filteredProducts, SetFilteredProducts]=useState([]); 
    useEffect(()=>{
        if(searchQuery.length>0){
            SetFilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        }else{
            SetFilteredProducts(products);
        }
    },[products,searchQuery])

  return (
    <div className='flex flex-col mt-16'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All Products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
         <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
            {filteredProducts.filter((product)=>product.inStock).map((product,index)=>(
                <Productcard key={index} product={product} />
            ))}
         </div>
    </div>
  )
}

export default Allproducts
