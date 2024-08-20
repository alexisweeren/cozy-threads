"use client"
import { useContext, useEffect, useState } from "react"
import { FavoritesContext } from "@/context/favoritesContext"

export default function Favorites() {
    const { selectedFavorites } = useContext(FavoritesContext)
    const [favoritesData, setFavoritesData] = useState([])

    useEffect(() => {
        if (selectedFavorites.length > 0) {
            fetch(`/api/products?ids=${selectedFavorites.join(',')}`)
                .then(response => response.json())
                .then(data => setFavoritesData(data))
                .catch(error => {
                    console.error('Error fetching data:', error)
                })
        }
    }, [selectedFavorites])

    return (
        <div className="text-black">
            Here are my favs!
            <br></br>
            <div className="text-black">
                {favoritesData.length > 0 ? (
                    favoritesData.map(favorite => (
                        <div className="text-black" key={favorite.id}>
                            <div className="bg-gray-100 p-4 rounded-xl flex items-center justify-center">
                                <img src={favorite.imageUrl} style={{ width: '200px', height: '200px' }} />
                            </div>
                            {favorite.name}
                            <div>{favorite.description}</div>
                            <br></br>
                        </div>
                    ))
                ) : (
                    <div>No favorites selected.</div>
                )}
            </div>
        </div>
    )
}
