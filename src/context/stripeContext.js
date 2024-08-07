'use client'
import { createContext, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

export const StripeContext = createContext({});

export function StripeContextProvider({ children }) {
    const [stripeItems, setStripeItems] = useState([])

    return (
        <StripeContext.Provider value={{stripeItems, setStripeItems }}>
            {children}
        </StripeContext.Provider>
    );
}
