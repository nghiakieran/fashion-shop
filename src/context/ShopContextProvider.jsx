import { useEffect, useState } from "react";

import { ShopContext } from "./ShopContext";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ShopContextProvider = ({ children }) => {

  const currency = '$'
  const delivery_fee = 10
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = ( itemId, size) => {
    if (!size) {
      toast.error('Select Product Size', {
        autoClose: 2000
      })
      return
    }
    // Create oject copy have nested object - structuredClone
    let cartData = structuredClone(cartItems)
    // Handle add cart with size
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1
      }
      else {
        cartData[itemId][size] = 1
      }
    }
    else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }
    setCartItems(cartData)
    toast.success('Item added to cart!', { // Thông báo thành công
      position: 'top-right',
      autoClose: 2000,
    });
  }

  const getCartCount = () => {
    let totalCount = 0
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item]
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount
  }

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems)
    if (quantity <= 0) {
      delete cartData[itemId][size]; // Xóa size
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId]; // Xóa itemId nếu không còn size nào
      }
    } else {
      cartData[itemId][size] = quantity;
      toast.success('Quantity updated', { position: 'top-right', autoClose: 2000 });
    }
    setCartItems(cartData);
  }

  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItems) {
      let itemInfo = products.find(product => product._id === items) 
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item]
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount
  }

  const value = {
    products, currency, delivery_fee,
    search, setSearch, showSearch, setShowSearch,
    cartItems, addToCart,
    getCartCount, updateQuantity, getCartAmount,
    navigate, setCartItems
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
