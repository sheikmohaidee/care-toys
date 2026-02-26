"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS as initialProducts, Product } from "../lib/data";

interface ProductContextType {
    products: Product[];
    addProduct: (product: Omit<Product, "id">) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (productId: string) => void;
    getProduct: (productId: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initial load from Local Storage or static data
    useEffect(() => {
        const savedProducts = localStorage.getItem("caretoys_products");
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            setProducts(initialProducts);
        }
        setIsInitialized(true);
    }, []);

    // Save to Local Storage whenever products change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("caretoys_products", JSON.stringify(products));
        }
    }, [products, isInitialized]);

    const addProduct = (newProductData: Omit<Product, "id">) => {
        const newProduct: Product = {
            ...newProductData,
            id: Math.random().toString(36).substr(2, 9),
        };
        setProducts((prev) => [newProduct, ...prev]);
    };

    const updateProduct = (updatedProduct: Product) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
    };

    const deleteProduct = (productId: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
    };

    const getProduct = (productId: string) => {
        return products.find((p) => p.id === productId);
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                addProduct,
                updateProduct,
                deleteProduct,
                getProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
}
