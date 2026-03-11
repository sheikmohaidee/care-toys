"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { useProducts } from "../../lib/useProducts";

export default function Shop() {
    const { products, loading } = useProducts();

    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="mx-auto flex w-full max-w-7xl flex-grow gap-8 px-6 py-8 md:px-10">
                {/* Sidebar Filters */}
                <aside className="hidden w-64 shrink-0 lg:block">
                    <div className="sticky top-24 flex flex-col gap-8">
                        {/* Categories */}
                        <div>
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Categories</h3>
                            <div className="flex flex-col gap-1">
                                {["Educational", "Wooden", "Robotics", "Puzzles", "Die-cast"].map(cat => (
                                    <button key={cat} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <span>{cat}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Price Range</h3>
                            <div className="px-2">
                                <div className="relative mb-6 h-1 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                                    <div className="absolute left-0 right-1/4 h-1 rounded-full bg-primary"></div>
                                    <div className="absolute left-0 -top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-white shadow-sm"></div>
                                    <div className="absolute right-1/4 -top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-white shadow-sm"></div>
                                </div>
                                <div className="flex items-center justify-between text-sm font-semibold">
                                    <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-1">$10</span>
                                    <span className="text-slate-400">—</span>
                                    <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-1">$150</span>
                                </div>
                            </div>
                        </div>

                        {/* Availability */}
                        <div>
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Availability</h3>
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary bg-transparent" />
                                    <span className="text-sm font-medium">In Stock</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary bg-transparent" />
                                    <span className="text-sm font-medium">Pre-order</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <section className="flex-1">
                    {/* Toolbar */}
                    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h1 className="text-2xl font-bold leading-tight">Shop All Products</h1>
                            <p className="text-sm text-slate-500">Showing products</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2">
                                <span className="text-xs font-bold text-slate-400 uppercase">Sort:</span>
                                <select className="border-none bg-transparent p-0 text-sm font-semibold focus:ring-0 outline-none">
                                    <option>Best Match</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest Arrivals</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {loading ? (
                        <div className="py-20 text-center text-slate-500">Loading products...</div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {products.length > 0 ? (
                                products.map((item: any) => (
                                    <Link href={`/product/${item.id}`} key={item.id} className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all hover:shadow-xl hover:-translate-y-1">
                                        <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                            <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${item.images && JSON.parse(item.images)[0] ? JSON.parse(item.images)[0] : ''})` }} />
                                            <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
                                                <span className="material-symbols-outlined text-xl">favorite</span>
                                            </button>
                                        </div>
                                        <div className="flex flex-1 flex-col p-5">
                                            <p className="mb-1 text-xs font-bold text-primary uppercase tracking-wider">{item.category?.name || 'Category'}</p>
                                            <h3 className="mb-2 text-lg font-bold leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                                            <div className="mb-4 flex items-center gap-1 text-yellow-400">
                                                <span className="material-symbols-outlined text-sm">star</span>
                                                <span className="material-symbols-outlined text-sm">star</span>
                                                <span className="material-symbols-outlined text-sm">star</span>
                                                <span className="material-symbols-outlined text-sm">star</span>
                                                <span className="material-symbols-outlined text-sm">star_half</span>
                                            </div>
                                            <div className="mt-auto flex items-center justify-between">
                                                <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                                                <button className="rounded-lg bg-slate-900 dark:bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary dark:hover:bg-primary/80 transition-all" onClick={(e) => { e.preventDefault(); }}>
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center text-slate-500">No products found.</div>
                            )}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}
