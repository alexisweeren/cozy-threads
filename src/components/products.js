import { useContext } from 'react';
import { ProductsContext } from '../context/productContext'

export default function Product({_id, name, price, description, imageUrl, productId, priceId}) {
    const { selectedProducts, setSelectedProducts } = useContext(ProductsContext)

    const addToCart = () => {
        setSelectedProducts(prev => [...prev,productId]);
    }

    return (
        <div className="py-4">
            <div className="w-64">
                <div className="bg-gray-100 p-5 rounded-xl">
                    <img src={imageUrl} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                </div>
                <div className="mt-2">
                    <h3 className="font-bold text-lg text-black">{name}</h3>
                </div>
                <p className="text-sm mt-1 leading-4 text-gray-600">{description}</p>
                <div className="flex mt-1 justify-between items-center">
                    <div className="text-2xl font-bold text-black">${price}</div>
                    <button
                        onClick={addToCart}
                        className="bg-forest-green text-white py-1 px-3 rounded-xl"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}
