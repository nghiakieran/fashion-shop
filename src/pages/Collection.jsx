import React, {  useContext, useMemo, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [sortType, setSortType] = useState('relavent')
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])

  const toggleCategory = (e) => {
    const value = e.target.value
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    )
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    )
  }

  //  useMemo để tính toán sản phẩm đã lọc
  const filteredProducts = useMemo(() => {
    if (!products) return []

    let filtered = [...products]

    if (showSearch && search) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      filtered = filtered.filter(p => category.includes(p.category))
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter(p => subCategory.includes(p.subCategory))
    }

    return filtered
  }, [products, category, subCategory, showSearch, search])

  // useMemo để sắp xếp sản phẩm đã lọc
  const displayProducts = useMemo(() => {
    if (sortType === 'relavent') return filteredProducts

    return [...filteredProducts].sort((a, b) => {
      if (sortType === 'low-high') {
        return parseFloat(a.price) - parseFloat(b.price)
      } else {
        return parseFloat(b.price) - parseFloat(a.price)
      }
    })
  }, [filteredProducts, sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter collections */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='text-xl my-2 cursor-pointer sm:cursor-default flex items-center gap-2'>
          FILTERS
          <img src={assets.dropdown_icon} alt="dropdown_icon" 
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : '' }`} />
        </p>
        {/* Categories Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Men'} className='w-3' onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Women'} className='w-3' onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Kids'} className='w-3' onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>
        {/* Type Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Topwear'} className='w-3' onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Bottomwear'} className='w-3' onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Winterwear'} className='w-3' onChange={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* All collections */}
      <div className='flex-1'>
        <div className='flex justify-between text-[15px] sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Collections sort */}
          <select className='border-2 border-gray-300 text-sm px-2' onChange={e => setSortType(e.target.value)}>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map collections */}
        {
          displayProducts.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6'>
              {
                displayProducts.map(p => (
                  <ProductItem key={p._id} id={p._id} name={p.name} price={p.price} image={p.image} />
                ))
              }
            </div>
          ) :
          (
            <div className="text-center py-10">
              <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp.</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Collection
