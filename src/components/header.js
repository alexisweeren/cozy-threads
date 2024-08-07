'use client'
import Link from 'next/link'
import { useState, useContext } from 'react'
import { ProductsContext } from '../context/productContext'

export default function Header() {
    const [activePath, setActivePath] = useState('/')
    const { selectedProducts } = useContext(ProductsContext)

    const handleClick = (path) => {
        setActivePath(path)
    }

    return (
        <header className='sticky top-0 z-50 bg-white border-b border-grey-200'>
            <div className='bg-green-600'>
                <h3 className='text-white text-center text-xl'>
                    SALE! Use code 'STRIPEISCOOL50' for 50% off any order!
                </h3>
            </div>
            <div className='flex items-center justify-between p-4'>
                {/* <h3 className='text-black'>SALE! Use code 'STRIPEISCOOL50" for 50% off any order! </h3> */}
                <a href="/" className='flex items-center'>
                    <img src='/products/cozy-threads.png' alt="Logo" style={{ width: '150px', height: '70px' }} />
                </a>

                <div className="flex space-x-8 flex-grow justify-center">
                    <div className='text-gray-700 hover:underline cursor-pointer'>Hoodies</div>
                    <div className='text-gray-700 hover:underline cursor-pointer'>Accessories</div>
                    <div className='text-gray-700 hover:underline cursor-pointer'>Shirts</div>
                </div>

                <div className="flex space-x-6">
                    <Link href="/" onClick={() => handleClick('/')}>
                        <div className={`flex items-center cursor-pointer ${activePath === '/' ? 'text-forest-green' : 'text-black'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <span>Shop</span>
                        </div>
                    </Link>
                    <Link href="/" onClick={() => handleClick('/favorites')}>
                        <div className={`flex items-center cursor-pointer ${activePath === '/favorites' ? 'text-forest-green' : 'text-black'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            <span>Favorites</span>
                        </div>
                    </Link>
                    <Link href="/" onClick={() => handleClick('/login')}>
                        <div className={`flex items-center cursor-pointer ${activePath === '/login' ? 'text-forest-green' : 'text-black'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                            </svg>
                            <span>Log In</span>
                        </div>
                    </Link>
                    <Link href="/bag" onClick={() => handleClick('/bag')}>
                        <div className={`flex items-center cursor-pointer ${activePath === '/bag' ? 'text-forest-green' : 'text-black'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            <span>Cart {selectedProducts.length}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}
