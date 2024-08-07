import Footer from '../components/footer'
import { ProductsContextProvider } from '../context/productContext'
import './globals.css'
import { StripeContextProvider } from '../context/stripeContext'

export default function Layout({ children }) {


    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>My App</title>
            </head>
            <body>
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
