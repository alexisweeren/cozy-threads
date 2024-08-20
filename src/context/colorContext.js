"use client"
import { createContext, useState } from 'react'

export const ColorContext = createContext()

export function ColorContextProvider({ children }) {
    const [selectedColor, setSelectedColor] = useState('green')

    return (
        <ColorContext.Provider value={{ selectedColor, setSelectedColor }}>
            {children}
        </ColorContext.Provider>
    );
}
