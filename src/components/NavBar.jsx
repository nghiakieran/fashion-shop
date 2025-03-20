import { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
const NavBar = () => {

  const { setShowSearch, getCartCount } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)

  return (
    <div className='flex justify-between items-center py-5 font-medium'>
      <Link to='/'><img src={assets.logo} alt='logo' className='w-36'/></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 h-[1.5px] border-none bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 h-[1.5px] border-none bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 h-[1.5px] border-none bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 h-[1.5px] border-none bg-gray-700 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <Link to='/collection'>
          <img onClick={() => setShowSearch(true)} src={assets.search_icon}
            alt="search_icon" className='w-5 cursor-pointer' />
        </Link>

        <div className='group relative'>
          <img src={assets.profile_icon} alt="profile_icon" className='w-5 cursor-pointer' />
          <div className='group-hover:block hidden  absolute right-0 pt-4 '>
            <div className='flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} alt='cart_icon' className='w-5 min-w-5' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 leading-4 text-[8px] text-center 
            bg-black text-white rounded-full aspect-square'>
            {getCartCount()}
          </p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="menu_icon" className='w-5 cursor-pointer sm:hidden' />
      </div>

      {/* Sidebar menu for small screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0' }`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} alt="dropdown_icon" className='rotate-180 h-4' />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  )
}

export default NavBar
