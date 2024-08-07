
'use client'
import { useContext, useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { ProductsContext } from '../../../src/context/productContext.js'
import Link from 'next/link'
import { StripeContext } from '@/context/stripeContext'
export default function Bag() {

    const handleClick = (path) => {
        setActivePath(path)
    }
    const [activePath, setActivePath] = useState('/')
    const { stripeItems, setStripeItems } = useContext(StripeContext)
    const { selectedProducts, setSelectedProducts } = useContext(ProductsContext)
    const [productsInfo, setProductsInfo] = useState([])

    useEffect(() => {
        if (selectedProducts.length > 0) {
            const uniqueIds = [...new Set(selectedProducts)]

            fetch(`/api/products?ids=${uniqueIds.join(',')}`)
                .then(response => response.json())
                .then(data => setProductsInfo(data))
                .catch(error => {
                    console.error('Error fetching data:', error)
                })
        }
    }, [selectedProducts])
    useEffect(() => {
        if (productsInfo.length > 0) {
            const quantityMap = productsInfo.reduce((map, product) => {
                const count = selectedProducts.filter(id => id === product.productId).length
                if (count > 0) {
                    map.set(product.priceId, (map.get(product.priceId) || 0) + count)
                }
                return map
            }, new Map())

            const newStripeItems = Array.from(quantityMap, ([priceId, quantity]) => ({
                price: priceId,
                quantity,
            }))

            setStripeItems(newStripeItems)
        }
    }, [productsInfo, selectedProducts])

    const getProductCount = (productId) => {
        return selectedProducts.filter(id => id === productId).length
    }

    function addMoreProduct(id) {
        setSelectedProducts(prev => [...prev, id])
    }

    function removeProduct(id) {
        setSelectedProducts(prev => {
            const updatedProducts = prev.filter((productId, index, self) =>
                productId !== id || self.indexOf(productId) !== index
            )
            return updatedProducts
        })
    }

    return (
        <div>
            {selectedProducts.length > 0 ? (
                <ul>
                    <h1 className='text-black text-2xl font-bold'>Shopping Bag</h1>
                    {productsInfo.map((product) => (
                        <div key={product.productId} className='flex bg-white m-5'>
                            <div className='bg-gray-100 p-3 rounded-xl text-black'>
                                <img className='w-24' src={product.imageUrl} alt={product.name}></img>
                            </div>
                            <div className='pl-4'>
                                <h3 className='text-black text-lg font-bold'>{product.name}</h3>
                                <p className='text-black text-lm leading-4 text-gray-600'>{product.description}</p>
                                <div className='flex'>
                                    <div className='grow text-black'>${product.price}</div>
                                    <div className='text-black'>
                                        <button className='border border-forest-green text-forest-green px-2 rounded-lg' onClick={() => removeProduct(product.productId)}>-</button>
                                        <span className='px-2'>{getProductCount(product.productId)}</span>
                                        <button className='bg-forest-green border border-forest-green px-2 rounded-lg text-white' onClick={() => addMoreProduct(product.productId)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex">
                        <Link href="/checkout" className="m-auto">
                            <button className="bg-forest-green border-forest-green px-2 rounded-lg text-white">
                                I'm ready to checkout!
                            </button>
                        </Link>
                    </div>
                    <div>
                        <div className='text-black'>You may also like .... </div>
                        <div key="prod_QcDHb0HkGOwejK" className='flex bg-white m-5'>
                            <div className='bg-gray-100 p-3 rounded-xl text-black'>
                                <img className='w-24' src='/products/zip-up-grey.png' alt={'Zip Up Hoodie'}></img>
                            </div>
                            <div className='pl-4'>
                                <h3 className='text-black text-lg font-bold'>Zip Up Hoodie</h3>
                                <p className='text-black text-lm leading-4 text-gray-600'>Crafted from organic cotton and recycled polyester, this sustainable zip-up hoodie combines style and comfort. Featuring a classic design and eco-conscious materials, it’s a stylish choice for a greener wardrobe.</p>
                                <div className='flex'>
                                    <div className='grow text-black'>$35</div>
                                    <div className='text-black'>
                                        <button className='bg-forest-green border border-forest-green px-2 rounded-lg text-white' onClick={() => addMoreProduct('prod_QcDHb0HkGOwejK')}>Add it to cart!</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </ul>

            ) : (
                <div className="flex flex-col items-center space-y-6">
                    <div>
                        <p className='text-black text-xl m-auto'>No products in your cart...</p>
                    </div>
                    <div className='text-gray-700 m-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-12 h-12">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                        </svg>
                    </div>
                </div>

            )}
        </div>
    )

}
