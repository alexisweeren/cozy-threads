"use client"
import { createContext, useState } from 'react'

export const StripeContext = createContext()

export function StripeContextProvider({ children }) {
  const [stripeItems, setStripeItems] = useState([])

  return (
    <StripeContext.Provider value={{ stripeItems, setStripeItems }}>
      {children}
    </StripeContext.Provider>
  );
}
