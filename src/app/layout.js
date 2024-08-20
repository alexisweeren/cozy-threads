import Header from '../components/header'
import Footer from '../components/footer'
import { ProductsContextProvider } from '../context/productContext'
import './globals.css'
import { StripeContextProvider } from '../context/stripeContext'
import { FavoritesContextProvider } from '../context/favoritesContext'

export default function Layout({ children }) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <FavoritesContextProvider>
                    <ProductsContextProvider>
                        <StripeContextProvider>
                            <Header />
                            <main className="flex-grow p-5 bg-white">
                                {children}
                            </main>
                            <div id="chat-button" className="fixed bottom-5 right-5 z-50 forest-green">
                                <a href="mailto:cozythreadsupport@example.com" className="bg-gray-200 text-black rounded-full p-3 shadow-lg hover:bg-gray-400 inline-block">
                                    Email support!
                                </a>
                            </div>
                            <Footer />
                        </StripeContextProvider>
                    </ProductsContextProvider>
                </FavoritesContextProvider>
            </body>
        </html>
    );
}
