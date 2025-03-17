import React, { useContext, useEffect, useState } from 'react'

import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSellers = () => {

  const { products } = useContext(ShopContext)
  const [bestSellers, setBestSellers] = useState([])

  useEffect(() => {
    const bestProducts = products.filter(p => p.bestseller)
    setBestSellers(bestProducts.slice(0, 5))
  }, [products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-2xl sm:text-3xl'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          bestSellers.map(p => (
            <ProductItem key={p._id} id={p._id} name={p.name} image={p.image} price={p.price} />
          ))
        }
      </div>
    </div>
  )
}

export default BestSellers
