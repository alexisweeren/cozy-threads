'use client'
import Product from '../../src/context/productContext.js'
import { useState, useEffect } from 'react'

export default function Home() {
  const [productsInfo, setProductsInfo] = useState([])
  const [searchText, setSeachText] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setProductsInfo(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }

    fetchProducts()
  }, [])
  const categoryName = [...new Set(productsInfo.map(product => product.category))]

  let products
  if (searchText) {
    products = productsInfo.filter(product => product.name.toLowerCase().includes(searchText))
  } else {
    products = productsInfo
  }

  return (
    <div>
      <div className="p-5 bg-white">
        <div className='pb-8'>
          <input value={searchText} onChange={event => setSeachText(event.target.value)} type='text' placeholder='Seach for products...' className='bg-gray-100 w-full py-2 px-4 rounded-xl text-black'></input>
        </div>
        <div>
          {categoryName.map(categoryName => (

            <div key={categoryName}>
              {products.find(products => products.category === categoryName) && (
                <div> <h2 className="text-2xl capitalize text-black">{categoryName}</h2>
                  <div className="py-4">
                    <div className='flex -mx-5 overflow-x-scroll snap-x scrollbar-hide'>
                      {products.filter(product => product.category === categoryName).map(productInfo => (

                        <div key={productInfo.productId} className='px-5 snap-start'>
                          <Product
                            productId={productInfo.productId}
                            name={productInfo.name}
                            imageUrl={productInfo.imageUrl}
                            price={productInfo.price}
                            description={productInfo.description}
                            category={productInfo.category}
                            priceId={productInfo.priceId}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
