import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const { navigate, setCartItems } = useContext(ShopContext)
  const handleSubmitForm = (e) => {
    e.preventDefault()
    // Lấy dữ liệu từ form
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    // Kiểm tra các trường bắt buộc
    const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'country', 'phone'];
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');

    if (missingFields.length > 0) {
      // Hiển thị thông báo lỗi với toast
      toast.error('Please fill in all required fields: ' + missingFields.join(', '), {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }
    // Nếu hợp lệ, điều hướng đến /orders
    toast.success('Order placed successfully!', {
      position: 'top-right',
      autoClose: 2000,
    });
    setCartItems({}); // Xóa giỏ hàng
    navigate('/orders');
  }
  return (
    <form 
      onSubmit={handleSubmitForm}  
      className='flex flex-col sm:flex-row gap-4 justify-between pt-5 sm:pt-14 border-t'>
      {/* Left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input className='border px-3.5 py-1.5 rounded border-gray-300 w-full' name='firstName' type="text" required placeholder='First name'/>
          <input className='border px-3.5 py-1.5 rounded border-gray-300 w-full' name='lastName' type="text" required placeholder='Last name'/>
        </div>
        <input className='border px-3.5 py-1.5 rounded border-gray-300 w-full' name='email' type="email" required placeholder='Email address' />
        <input className='border px-3.5 py-1.5 rounded border-gray-300 w-full' name='street' type="text" required placeholder='Street' />
        <div className='flex gap-3'>
          <input className='border px-3.5 py-1.5 rounded border-gray-300 w-full' name='city' type="text" required placeholder='City' />
          <input className='border px-3.5 py-1.5 rounded border-gray-300 w-full' name='state' type="text" required placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input className='border px-3.5 py-1.5 rounded border-gray-300 w-full' name='zipcode' type="number" required placeholder='Zipcode' />
          <input className='border px-3.5 py-1.5 rounded border-gray-300 w-full' name='country' type="text" required placeholder='Country' />
        </div>
        <input className='border px-3.5 py-1.5 rounded border-gray-300 w-full' name='phone' type="number" required placeholder='Phone' />
      </div>
      {/* Right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex flex-col lg:flex-row gap-3'>
            <div onClick={() => setMethod('stripe')} className='flex items-center p-2 px-3 cursor-pointer gap-3 border'>
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} alt="stripe_logo" className='h-5 mx-4' />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center p-2 px-3 cursor-pointer gap-3 border'>
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="razorpay_logo" className='h-5 mx-4' />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center p-2 px-3 cursor-pointer gap-3 border'>
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
        </div>
        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
