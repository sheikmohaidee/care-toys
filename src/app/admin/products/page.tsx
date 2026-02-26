"use client";

import { useProducts } from "@/context/ProductContext";
import { Package, Plus, Search, Edit2, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminProductsPage() {
    const { products, deleteProduct } = useProducts();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-10 space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Garage <span className="text-neon-orange">Management</span></h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Add, modify or scrap your fleet</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-neon-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-orange-600 transition-all shadow-[0_20px_40px_rgba(255,92,0,0.2)] active:scale-95"
                >
                    <Plus className="w-4 h-4" /> Add New Engine
                </Link>
            </header>

            {/* Toolbar */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-6">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon-orange transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by name or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-orange/50 transition-all font-bold"
                    />
                </div>
                <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                    Showing <span className="text-white">{filteredProducts.length}</span> Engines
                </div>
            </div>

            {/* Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/40 border-b border-white/10">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Product</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Category</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Price</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Stock</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-10 bg-black/40 rounded-lg flex items-center justify-center border border-white/5 relative overflow-hidden">
                                            <div className="text-white/5 font-black text-[8px] italic rotate-12 select-none uppercase">{product.name}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-white uppercase italic tracking-tight group-hover:text-neon-orange transition-colors">{product.name}</div>
                                            <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">ID: {product.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 border border-white/5">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-sm font-black text-white">${product.price.toFixed(2)}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-1.5 w-20 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all ${(product.stock || 0) < 10 ? "bg-red-500" : "bg-neon-orange"}`}
                                                style={{ width: `${Math.min(100, (product.stock || 0) * 2)}%` }}
                                            ></div>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase ${(product.stock || 0) < 10 ? "text-red-500" : "text-gray-500"}`}>
                                            {product.stock || 0}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/product/${product.id}`}
                                            target="_blank"
                                            className="p-2 text-gray-500 hover:text-white transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/products/${product.id}`}
                                            className="p-2 text-gray-500 hover:text-neon-orange transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => {
                                                if (confirm(`Scrap ${product.name} from the garage?`)) deleteProduct(product.id);
                                            }}
                                            className="p-2 text-gray-500 hover:text-racing-red transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProducts.length === 0 && (
                    <div className="py-20 text-center">
                        <Package className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                        <h3 className="text-white font-black uppercase italic text-xl">No Engines in the Garage</h3>
                        <p className="text-gray-600 font-bold uppercase tracking-widest text-[10px] mt-2">Try a different search or add a new one</p>
                    </div>
                )}
            </div>
        </div>
    );
}
