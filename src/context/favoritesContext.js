"use client"
import { createContext, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

export const FavoritesContext = createContext({})

export function FavoritesContextProvider({ children }) {
    const [selectedFavorites, setSelectedFavorites] = useLocalStorageState('favorites', {
        defaultValue: []
    })

    return (
        <FavoritesContext.Provider value={{ selectedFavorites, setSelectedFavorites }}>
            {children}
        </FavoritesContext.Provider>
    )
}
