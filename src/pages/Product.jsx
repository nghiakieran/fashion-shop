import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import { useParams } from "react-router"
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import RelatedProduct from '../components/RelatedProduct'

const Product = () => {
 
  // Get dynamic params from URL, Good SEO
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  
  useEffect(() => {
    const fetchProduct = () => {
      const foundProduct = products.find(product => product._id === productId)
      if (foundProduct) {
        setProductData(foundProduct)
        setImage(foundProduct.image[0])
      }
    }
    fetchProduct()
  }, [products, productId])
  
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product data */}
      <div className='flex flex-col sm:flex-row gap-12'>
        {/* Product Image */}
        <div className='flex flex-col-reverse sm:flex-row flex-1 gap-3'>
          <div className='flex flex-row sm:flex-col w-full sm:w-[18.7%] justify-between sm:justify-normal'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} alt="product-item-image" 
                  className='sm:mb-3 cursor-pointer w-[24%] sm:w-full'/>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="product" className='w-full'/>
          </div>
        </div>
        {/* Product Detail */}
        <div className='flex-1'>
          <h1 className='mt-2 font-medium text-2xl'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="star_icon" className='w-3' />
            <img src={assets.star_icon} alt="star_icon" className='w-3' />
            <img src={assets.star_icon} alt="star_icon" className='w-3' />
            <img src={assets.star_icon} alt="star_icon" className='w-3' />
            <img src={assets.star_dull_icon} alt="star_dull_icon" className='w-3' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-3/4'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'> 
              {productData.sizes.map((item, index) => (
                <button 
                  onClick={() => setSize(item)} 
                  key={index} 
                  className={`py-2 px-4 border bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}>
                    {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='flex flex-col gap-1 text-sm text-gray-500 mt-5'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description and reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border p-6 text-sm text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products
            or services over the internet. It serves as a virtual marketplace where businesses and individuals
            can showcase their products, interact with customers, and conduct transactions without the need 
            for a physical presence. E-commerce websites have gained immense popularity due to their 
            convenience, accessibility, and the global reach they offer.
          </p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, 
            images, prices, and any available variations (e.g., sizes, colors). Each product usually has 
            its own dedicated page with relevant information.
          </p>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='opacity-0'></div>
  )
}

export default Product
