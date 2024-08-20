'use client'
import { useContext } from 'react'
import { ProductsContext } from '../context/productContext'
import { FavoritesContext } from '../context/favoritesContext'

export default function Product({ _id, name, price, description, imageUrl, productId, priceId }) {
    const { selectedProducts, setSelectedProducts } = useContext(ProductsContext)
    const { selectedFavorites, setSelectedFavorites } = useContext(FavoritesContext)

    const addToCart = () => {
        setSelectedProducts(prev => [...prev, productId])
    }
    const addToFavorites = () => {
        console.log(productId, ' added to fav')
        if (!selectedFavorites.includes(productId)) {
            setSelectedFavorites(prev => [...prev, productId]);
        }
        console.log(selectedFavorites)
    }

    return (
        <div className="py-4">
            <div className="w-64">
                <div className="bg-gray-100 p-4 rounded-xl flex items-center justify-center">
                    <img src={imageUrl} style={{ width: '200px', height: '200px' }} />
                </div>
                <div className="mt-3">
                    <h3 className="font-bold text-lg text-black">{name}</h3>
                </div>
                <p className="text-sm mt-1 leading-4 text-gray-600">{description}</p>
                <div className="flex mt-1 justify-between items-center">
                    <div className="text-2xl font-bold text-black">${price}</div>
                    <button className='text-black' onClick={addToFavorites}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>
                    <button
                        onClick={addToCart}
                        className="bg-forest-green text-white py-1 px-3 rounded-xl"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}
