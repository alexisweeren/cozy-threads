
'use client'
import { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { ProductsContext } from '/Users/alexis/Desktop/cozy-threads/src/context/productContext.js'; // Import the context
import Link from 'next/link';
import { StripeContext } from '@/context/stripeContext';
export default function Bag() {

    const handleClick = (path) => {
        setActivePath(path);
    }
    const [activePath, setActivePath] = useState('/');
    const { stripeItems, setStripeItems } = useContext(StripeContext)
    const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
    const [productsInfo, setProductsInfo] = useState([])

    useEffect(() => {
        if (selectedProducts.length > 0) {
            const uniqueIds = [...new Set(selectedProducts)]

            fetch(`/api/products?ids=${uniqueIds.join(',')}`)
                .then(response => response.json())
                .then(data => setProductsInfo(data))
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [selectedProducts]);
    useEffect(() => {
        if (productsInfo.length > 0) {
            const quantityMap = productsInfo.reduce((map, product) => {
                const count = selectedProducts.filter(id => id === product.productId).length;
                if (count > 0) {
                    map.set(product.priceId, (map.get(product.priceId) || 0) + count);
                }
                return map;
            }, new Map());

            const newStripeItems = Array.from(quantityMap, ([priceId, quantity]) => ({
                price: priceId,
                quantity,
            }));

            setStripeItems(newStripeItems);
        }
    }, [productsInfo, selectedProducts]);

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
            );
            return updatedProducts;
        });
    }
    console.log('stripe , ', stripeItems)

    return (
        <div>
            <img src={'products/cozy-threads.png'} style={{
                width: '150px',
                height: '70px',
                margin: '0 auto',
            }} />
            {productsInfo.length > 0 ? (
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
                            <button className="bg-green-700 border-forest-green px-2 rounded-lg text-white">
                                I'm ready to checkout!
                            </button>
                        </Link>
                    </div>

                </ul>

            ) : (
                <p>No products in the cart.</p>
            )}
        </div>
    );

}
