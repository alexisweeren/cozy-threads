'use client'
import React, { useCallback, useContext } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { StripeContext } from '@/context/stripeContext'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'

const stripePromise = await loadStripe('pk_test_51PkVmAAZABspyeK0HLL6SRwhkHx3hKs2KVNiyuZXvkg0Up5itLajM0xyWOmJOPUm98RrcBCw1H9JoMqoKynfpTQ500vzdKtin0')

export default function CheckOut() {

    const { stripeItems, setStripeItems } = useContext(StripeContext)

    const fetchClientSecret = useCallback(() => {
        const requestBody = { items: stripeItems }

        return fetch("/api/stripe", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://cozy-threads.netlify.app'
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