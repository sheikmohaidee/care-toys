"use client";

import { useProducts } from "@/context/ProductContext";
import { Archive, Search, AlertTriangle, RefreshCw, Layers } from "lucide-react";
import { useState } from "react";

export default function AdminInventoryPage() {
    const { products } = useProducts();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLowStock, setFilterLowStock] = useState(false);

    const filteredInventory = products.filter(p =>
        (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!filterLowStock || (p.stock || 0) < 10)
    );

    return (
        <div className="p-10 space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Stock <span className="text-neon-orange">Control</span></h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Manage quantities and monitor shortages</p>
                </div>
                <div className="flex gap-4">
                    <button
                        className="bg-white/5 border border-white/10 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-white/10 transition-all active:scale-95"
                    >
                        <Layers className="w-4 h-4" /> Bulk Update
                    </button>
                    <button
                        className="bg-neon-orange text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-orange-600 transition-all shadow-[0_20px_40px_rgba(255,92,0,0.2)] active:scale-95"
                    >
                        <RefreshCw className="w-4 h-4" /> Sync Inventory
                    </button>
                </div>
            </header>

            {/* Toolbar */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-6">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon-orange transition-colors" />
                    <input
                        type="text"
                        placeholder="Search inventory by product name or SKU..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-orange/50 transition-all font-bold"
                    />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={filterLowStock}
                        onChange={(e) => setFilterLowStock(e.target.checked)}
                        className="rounded border-gray-600 text-neon-orange focus:ring-neon-orange bg-black/20"
                    />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Show Low Stock Only</span>
                </label>
            </div>

            {/* Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/40 border-b border-white/10">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Product SKU</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Product Name</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Stock Quantity</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Last Updated</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Quick Update</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredInventory.map((product) => {
                            const isLowStock = (product.stock || 0) < 10;
                            const isOutOfStock = (product.stock || 0) === 0;

                            return (
                                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-6">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{product.id.split('-')[0]}-SKU</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            {isLowStock && !isOutOfStock && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                                            {isOutOfStock && <AlertTriangle className="w-4 h-4 text-red-500" />}
                                            <span className="text-sm font-black text-white">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`text-lg font-black ${isOutOfStock ? "text-red-500" : isLowStock ? "text-yellow-500" : "text-white"}`}>
                                            {product.stock || 0}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                                            isOutOfStock ? "bg-red-500/20 text-red-500" :
                                            isLowStock ? "bg-yellow-500/20 text-yellow-500" :
                                            "bg-green-500/20 text-green-500"
                                        }`}>
                                            {isOutOfStock ? "Out of Stock" : isLowStock ? "Low Stock" : "In Stock"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-xs font-bold text-gray-500">2 hrs ago</span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-white transition-all">-</button>
                                            <input type="number" defaultValue={product.stock || 0} className="w-16 bg-black/40 border border-white/10 rounded-lg py-1 px-2 text-center text-sm font-bold text-white focus:outline-none focus:border-neon-orange/50 no-spinners" />
                                            <button className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-white transition-all">+</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {filteredInventory.length === 0 && (
                    <div className="py-20 text-center">
                        <Archive className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                        <h3 className="text-white font-black uppercase italic text-xl">No Inventory Records</h3>
                    </div>
                )}
            </div>

            <style jsx global>{`
                .no-spinners::-webkit-outer-spin-button,
                .no-spinners::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                .no-spinners {
                    -moz-appearance: textfield;
                }
            `}</style>
        </div>
    );
}
