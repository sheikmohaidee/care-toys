"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { cartApi } from "./api"; 

export interface CartItem {
    id: string; // The cart item id returned from backend
    product_id?: number; 
    name: string;
    price: number;
    image_url?: string;
    image?: string;
    quantity: number;
    category?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: any) => Promise<void>;
    removeFromCart: (id: string) => Promise<void>;
    updateQuantity: (id: string, quantity: number) => Promise<void>;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        setLoading(true);
        try {
            const res = await cartApi.get();
            if (res.data && res.data.success) {
                const items = res.data.data.map((item: any) => ({
                    id: item.cart_item_id.toString(),
                    product_id: item.id, 
                    name: item.name,
                    price: parseFloat(item.price),
                    image: item.image_url,
                    quantity: item.quantity,
                    category: item.category_id?.toString()
                }));
                setCart(items);
            }
        } catch (e) {
            console.error("Failed to fetch cart", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const addToCart = async (product: any) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login to add to cart");
            return;
        }
        
        try {
            await cartApi.add({ product_id: parseInt(product.id), quantity: 1 });
            await fetchCart(); 
        } catch (e) {
            console.error("Failed to add to cart", e);
        }
    };

    const removeFromCart = async (cartItemId: string) => {
        try {
            await cartApi.remove(cartItemId);
            await fetchCart();
        } catch (e) {
            console.error("Failed to remove item", e);
        }
    };

    const updateQuantity = async (cartItemId: string, quantity: number) => {
        if (quantity < 1) return;
        try {
             // Optimistic update
             setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity } : item));
             await cartApi.update(cartItemId, quantity);
        } catch (e) {
             console.error("Failed to update quantity", e);
             await fetchCart(); 
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
                loading,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
