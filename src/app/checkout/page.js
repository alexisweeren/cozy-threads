'use client'
import React, { useCallback, useContext } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { StripeContext } from '@/context/stripeContext'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function CheckOut() {

    const { stripeItems, setStripeItems } = useContext(StripeContext)

    const fetchClientSecret = useCallback(() => {
        const requestBody = { items: stripeItems }

        return fetch("/api/stripe", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
        })
            .then((res) => res.json())
            .then((data) => data.clientSecret)
    }, [stripeItems])

    const options = { fetchClientSecret }

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}