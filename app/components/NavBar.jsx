import Link from 'next/link'
import React from 'react'

function NavBar() {
  return (
    <nav className='w-full h-16  bg-gray-800 shadow-lg border border-gray-900 rounded-b-sm  flex items-center px-4 justify-between  z-50 relative '>
      <Link href="/">
      <h1 className='text-xl font-bold items-start text-sky-100 p-4  hover:shadow-gray-400 '>Keymatic</h1>
      </Link>
     
        <ul className='flex gap-6 p-4  hover:shadow-gray-400 '>
            <li><Link href='/' className='font-bold text-gray-200 hover:text-gray-600'>Home</Link></li>
            <li><Link href='/products' className=' font-bold text-gray-200 hover:text-gray-600'>Products</Link></li>
            <li><Link href='/cart' className='font-bold text-gray-200 hover:text-gray-600 '>Cart</Link></li>
            <li><Link href='/aboutus' className='font-bold text-gray-200 hover:text-gray-600 '>About Us</Link></li>
        </ul>
    </nav>
  )
}

export default NavBar