"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CartCheckout() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
                {/* Cart Section */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="material-symbols-outlined text-primary text-3xl">shopping_basket</span>
                        <h2 className="text-3xl font-black tracking-tight">Your Cart</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items Table */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 dark:bg-slate-800/50">
                                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Product</th>
                                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Quantity</th>
                                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Price</th>
                                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                                <td className="px-6 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-16 w-16 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 bg-cover bg-center border border-slate-200 dark:border-slate-700" />
                                                        <div>
                                                            <p className="font-bold text-slate-900 dark:text-slate-100">Wooden Stacking Blocks</p>
                                                            <p className="text-xs text-slate-500">Natural Beechwood, 24pcs</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg w-fit">
                                                        <button className="px-3 py-1 text-slate-500 hover:text-primary">-</button>
                                                        <span className="px-3 py-1 font-semibold text-sm">1</span>
                                                        <button className="px-3 py-1 text-slate-500 hover:text-primary">+</button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <span className="font-bold text-primary">$29.99</span>
                                                </td>
                                                <td className="px-6 py-6 text-right">
                                                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm sticky top-24">
                                <h3 className="text-lg font-bold mb-6">Order Summary</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                        <span className="text-sm">Subtotal</span>
                                        <span className="text-sm font-semibold">$29.99</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                        <span className="text-sm">Shipping</span>
                                        <span className="text-sm text-primary font-medium">Free</span>
                                    </div>
                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                                        <span className="text-base font-bold">Total</span>
                                        <span className="text-xl font-black text-primary">$29.99</span>
                                    </div>
                                </div>
                                <button className="w-full mt-8 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                                    <span>Proceed to Checkout</span>
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="border-slate-200 dark:border-slate-800 my-16"/>

                {/* Checkout Section */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="material-symbols-outlined text-primary text-3xl">lock</span>
                        <h2 className="text-3xl font-black tracking-tight">Checkout</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Shipping Form */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">local_shipping</span>
                                Shipping Details
                            </h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">First Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary outline-none" placeholder="John"/>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Last Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary outline-none" placeholder="Doe"/>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">credit_card</span>
                                        Payment Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Card Number</label>
                                            <input type="text" className="w-full px-4 py-3 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary outline-none" placeholder="**** **** **** ****"/>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-slate-900 dark:bg-primary text-white font-bold py-4 rounded-lg transition-all">
                                    Complete Purchase $29.99
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
