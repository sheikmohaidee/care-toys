"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductDetails() {
    const { id } = useParams();

    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-8 text-sm text-slate-500">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <Link href="/shop" className="hover:text-primary">Shop</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-slate-900 dark:text-white font-medium">Premium Care Plush Toy</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Left: Image Gallery */}
                    <div className="flex flex-col-reverse md:flex-row gap-4">
                        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto">
                            {[1, 2, 3, 4].map((thumb) => (
                                <button key={thumb} className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 ${thumb === 1 ? 'border-primary' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'} overflow-hidden bg-slate-100 dark:bg-slate-800`}>
                                    <div className="w-full h-full bg-cover bg-center" />
                                </button>
                            ))}
                        </div>
                        <div className="flex-1 aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 group relative">
                            <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute top-4 right-4">
                                <button className="p-2 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-sm text-slate-900 dark:text-white hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined">favorite</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Information */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-amber-400">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star} className="material-symbols-outlined text-sm fill-current">star</span>
                                    ))}
                                </div>
                                <span className="text-xs text-slate-500">(128 reviews)</span>
                                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">In Stock</span>
                            </div>
                            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">Premium Care Plush Toy</h2>
                            <p className="text-2xl font-bold text-primary">$29.99</p>
                        </div>

                        <div className="h-px bg-slate-200 dark:bg-slate-800 w-full"></div>

                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            Designed with extra soft hypoallergenic materials, our Premium Care Plush Toy provides comfort and emotional support for children of all ages.
                        </p>

                        <div className="flex flex-col gap-4">
                            <span className="text-sm font-bold">Quantity</span>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 overflow-hidden h-12">
                                    <button className="px-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <span className="material-symbols-outlined text-sm">remove</span>
                                    </button>
                                    <input type="number" defaultValue="1" className="w-12 text-center border-none focus:ring-0 bg-transparent text-sm font-bold outline-none" />
                                    <button className="px-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <span className="material-symbols-outlined text-sm">add</span>
                                    </button>
                                </div>
                                <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2 h-12 shadow-lg shadow-primary/25">
                                    <span className="material-symbols-outlined">shopping_bag</span>
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                <span className="material-symbols-outlined text-primary">local_shipping</span>
                                <div>
                                    <p className="text-xs font-bold">Free Shipping</p>
                                    <p className="text-[10px] text-slate-500">Orders over $50</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                <span className="material-symbols-outlined text-primary">verified_user</span>
                                <div>
                                    <p className="text-xs font-bold">1 Year Warranty</p>
                                    <p className="text-[10px] text-slate-500">Quality guaranteed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mb-16">
                    <div className="border-b border-slate-200 dark:border-slate-800 mb-8">
                        <div className="flex gap-8 overflow-x-auto pb-px">
                            <button className="pb-4 text-sm font-bold border-b-2 border-primary text-primary whitespace-nowrap">Description</button>
                            <button className="pb-4 text-sm font-medium border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white whitespace-nowrap">Specifications</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-2 space-y-6">
                            <h3 className="text-xl font-bold">Product Details</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Our flagship toy isn't just a toy; it's a companion designed with child psychology in mind.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {["Hypoallergenic materials", "Machine washable", "Non-toxic", "Safety tested"].map(feat => (
                                    <li key={feat} className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                        <span className="text-sm">{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
