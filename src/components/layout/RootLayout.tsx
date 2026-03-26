import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartProvider } from "@/lib/cart-context";
import { Outlet } from "react-router-dom";

export function RootLayout() {
    return (
        <CartProvider>
            <div className="flex flex-col min-h-screen antialiased bg-background text-foreground">
                <Navbar />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </CartProvider>
    );
}
