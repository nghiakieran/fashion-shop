import { useState } from "react";

import { ShopContext } from "./ShopContext";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ShopContextProvider = ({ children }) => {

  const currency = '$'
  const delivery_fee = 10
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState({})
  const navigate = useNavigate()

  const addToCart = ( itemId, size) => {
    if (!size) {
      toast.error('Select Product Size', {
        autoClose: 3000
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
    cartData[itemId][size] = quantity
    setCartItems(cartData)
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
    navigate
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
