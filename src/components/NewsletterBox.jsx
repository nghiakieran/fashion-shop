import React from 'react'

const NewsletterBox = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      <form onSubmit={handleSubmit} action="" className='w-full sm:w-1/2 my-6 flex items-center mx-auto border pl-3 gap-3'>
        <input className='w-full  outline-none text-gray-500 ' type='email' placeholder='Enter your email' required/>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsletterBox
