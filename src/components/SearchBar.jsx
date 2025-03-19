import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'
const SearchBar = () => {

  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const location = useLocation()
  const inputRef = useRef(null)

  // Xác định xem có hiển thị thanh tìm kiếm không
  useEffect(() => {
    setVisible(location.pathname.includes('collection'));
  }, [location]);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  const handleDeleteSearch = () => {
    setShowSearch(false)
    setSearch('')
  }
  return showSearch && visible ? (
    <div className='bg-gray-50 border-t border-b text-center'>
      <div className='inline-flex items-center px-5 py-2 my-5 mx-3 border border-gray-400 rounded-full
        w-3/4 sm:w-1/2'>
        <input type="text" ref={inputRef} placeholder='Search' value={search} onChange={e => setSearch(e.target.value)}
          className='outline-none flex-1 bg-inherit text-sm text-gray-500' 
        />
        <img src={assets.search_icon} alt="search_icon" className='ml-2 w-4 cursor-pointer' />
      </div>
      <img src={assets.cross_icon} alt="cross_icon" 
        className='w-3 cursor-pointer inline' 
        onClick={handleDeleteSearch}
      />
    </div>
  ) : null
}

export default SearchBar
