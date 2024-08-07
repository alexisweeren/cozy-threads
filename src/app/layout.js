// /Users/alexis/Desktop/cozy-threads/src/app/layout.js
import Footer from '../components/footer';
import { ProductsContextProvider } from '../context/productContext'; // Import the provider
import './globals.css'; // Import global styles if needed
import { StripeContextProvider } from '../context/stripeContext';

export default function Layout({ children }) {


    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>My App</title>
            </head>
            <body>
                {/* <StripeContextProvider> */}
                    <ProductsContextProvider>
                    <StripeContextProvider>
                        <div className='p-5 bg-white'>
                            {children}
                        </div>
                        <Footer />
                        </StripeContextProvider>
                    </ProductsContextProvider>
                
            </body>
        </html>
    );
}
