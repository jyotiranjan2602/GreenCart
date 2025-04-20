import React from 'react'
import Productcard from './Productcard'
import { useAppContext } from '../Context/Appcontext'

const Bestseller = () => {
    const {products} = useAppContext();
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-6 lg:grid-cols-5 mt-6'>
        {products.filter((product)=>product.inStock).slice(0,5).map((product,index)=>(
           <Productcard key={index} product={product}/>
        ))}
        
      </div>
    </div>
  )
}

export default Bestseller
