import Header from '../components/header'
import Footer from '../components/footer'
import { ProductsContextProvider } from '../context/productContext'
import './globals.css'
import { StripeContextProvider } from '../context/stripeContext'

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <ProductsContextProvider>
                    <StripeContextProvider>
                        <Header />
                        <main className="flex-grow p-5 bg-white">
                            {children}
                        </main>
                        <Footer />
                    </StripeContextProvider>
                </ProductsContextProvider>
            </body>
        </html>
    );
}
