"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function SearchResults() {
    const [searchQuery, setSearchQuery] = useState("Porsche 911");

    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-grow">
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="flex mb-6 text-sm text-slate-500">
                    <ol className="flex items-center space-x-2">
                        <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                        <li><span className="material-symbols-outlined text-xs">chevron_right</span></li>
                        <li><span className="text-slate-900 dark:text-slate-200 font-medium">Search: "{searchQuery}"</span></li>
                    </ol>
                </nav>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 shrink-0 space-y-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Filters</h3>
                            <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
                                <button className="flex w-full items-center justify-between py-2 text-sm font-semibold">
                                    <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">category</span> Category</span>
                                </button>
                                <div className="mt-2 space-y-2">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" />
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Model Cars</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" />
                                        <span className="text-sm text-slate-600 dark:text-slate-400">LEGO Sets</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Content */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Results for "{searchQuery}"</h1>
                                <p className="text-sm text-slate-500">Showing 1-12 items</p>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all hover:shadow-xl hover:shadow-primary/5">
                                    <div className="aspect-square relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        <div className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110" />
                                        <button className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-slate-400 hover:text-red-500 shadow-sm transition-colors">
                                            <span className="material-symbols-outlined text-xl">favorite</span>
                                        </button>
                                    </div>
                                    <div className="flex flex-1 flex-col p-4">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Brand</p>
                                        <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white line-clamp-2">Search Result Item {item}</h3>
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-lg font-bold text-primary">$159.99</span>
                                            <button className="flex items-center justify-center rounded-lg bg-primary/10 p-2 text-primary hover:bg-primary hover:text-white transition-all">
                                                <span className="material-symbols-outlined">add_shopping_cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
