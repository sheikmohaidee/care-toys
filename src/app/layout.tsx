import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Care Toys | Premium Collector Destination",
  description: "The ultimate collector's destination for rare finds, limited editions, and high-octane racing sets.",
};

import { CartProvider } from "../context/CartContext";
import { ProductProvider } from "../context/ProductContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${jakarta.className} antialiased bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col min-h-screen`}>
        <ProductProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
