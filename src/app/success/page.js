'use client';
import React, { useEffect, useState, useContext } from 'react';
import { redirect } from 'next/navigation'
import { ProductsContext } from '/Users/alexis/Desktop/cozy-threads/src/context/productContext.js';

export default function Success() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  let { selectedProducts, setSelectedProducts } = useContext(ProductsContext);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');
    setSelectedProducts([])

    fetch(`/api/stripe`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  function generateRandomOrderNumer(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  return (
    <section className='text-black text-center' id="success">
         <img src={'products/cozy-threads.png'} style={{
                width: '150px',
                height: '70px',
                margin: '0 auto',
            }} />
      <p>
        We appreciate your business!<br></br>
        Your order confirmation number is '{generateRandomOrderNumer()}'.
        <br></br>A confirmation email will be sent to your email.
        <br></br><br></br><br></br>
        If you have any questions, please email <a href="mailto:orders@cozythreadsupport.com">cozythreadsupport@example.com</a>.
      </p>
    </section>
  )
}