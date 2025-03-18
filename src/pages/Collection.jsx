import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const { products } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])

  useEffect(() => {
    setFilterProducts(products)
  }, [products])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter collections */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='text-xl my-2 cursor-pointer flex items-center gap-2'>
          FILTERS
          <img src={assets.dropdown_icon} alt="dropdown_icon" 
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : '' }`} />
        </p>
        {/* Categories Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Men'} className='w-3'/> Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Women'} className='w-3' /> Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Kids'} className='w-3' /> Kids
            </p>
          </div>
        </div>
        {/* Type Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Topwear'} className='w-3' /> Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Bottomwear'} className='w-3' /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Winterwear'} className='w-3' /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* All collections */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Collections sort */}
          <select className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map collections */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map(p => (
              <ProductItem key={p._id} id={p._id} name={p.name} price={p.price} image={p.image}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
