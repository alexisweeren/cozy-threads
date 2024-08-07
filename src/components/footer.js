'use client';

export default function Footer() {
    return (
        <footer className="bg-forest-green text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
                        <p className="mb-1">Email: <a href="mailto:cozythreadsupport@example.com" className="text-white">cozythreadsupport@example.com</a></p>
                        <p className="mb-1">Phone: <a href="tel:+1234567890" className="text-white">+1 (234) 567-890</a></p>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold mb-2">Information</h3>
                        <ul>
                            <li><a href="/" className="text-white hover:underline">About Us</a></li>
                            <li><a href="/" className="text-white hover:underline">Privacy Policy</a></li>
                            <li><a href="/" className="text-white hover:underline">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold mb-2">Store Locator</h3>
                        <p className="mb-1">Find the nearest store to you:</p>
                        <a href="/" className="text-white hover:underline">Store Locator</a>
                    </div>
                </div>
                <div className="text-center mt-4 border-t border-gray-700 pt-4">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Cozy Threads. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
