"use client";

import { Flame, Plus, Search, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AdminDealsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const mockDeals = [
        { id: "d1", name: "Weekend Special", products: 12, discount: "15% OFF", expiry: "2024-03-05T23:59:59Z", status: "Active" },
        { id: "d2", name: "Clearance Sale", products: 45, discount: "50% OFF", expiry: "2024-04-01T00:00:00Z", status: "Active" },
        { id: "d3", name: "Flash Deal: Hot Wheels", products: 5, discount: "20% OFF", expiry: "2024-02-28T12:00:00Z", status: "Expired" },
    ];

    const filteredDeals = mockDeals.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-10 space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Deals <span className="text-neon-orange">Management</span></h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Manage promotions and discounts</p>
                </div>
                <button
                    className="bg-neon-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-orange-600 transition-all shadow-[0_20px_40px_rgba(255,92,0,0.2)] active:scale-95"
                >
                    <Plus className="w-4 h-4" /> Create Deal
                </button>
            </header>

            {/* Toolbar */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-6">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon-orange transition-colors" />
                    <input
                        type="text"
                        placeholder="Search deals by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-orange/50 transition-all font-bold"
                    />
                </div>
                <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                    Showing <span className="text-white">{filteredDeals.length}</span> Deals
                </div>
            </div>

            {/* Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/40 border-b border-white/10">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Deal Name</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Products Included</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Discount</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Expiry</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredDeals.map((deal) => (
                            <tr key={deal.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-8 py-6">
                                    <span className="text-sm font-black text-white">{deal.name}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-sm font-black text-neon-orange">{deal.products} Items</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="bg-green-500/20 text-green-500 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">{deal.discount}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-gray-400">{new Date(deal.expiry).toLocaleDateString()}</span>
                                        <span className="text-[10px] font-bold text-gray-500">{new Date(deal.expiry).toLocaleTimeString()}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked={deal.status === "Active"} disabled={deal.status === "Expired"} />
                                        <div className={`w-9 h-5 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${deal.status === 'Expired' ? 'bg-gray-800' : 'bg-gray-600 peer-checked:bg-neon-orange'}`}></div>
                                    </label>
                                    {deal.status === 'Expired' && <span className="ml-2 text-[10px] text-red-500 font-bold uppercase tracking-widest">Expired</span>}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-gray-500 hover:text-neon-orange transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-500 hover:text-racing-red transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredDeals.length === 0 && (
                    <div className="py-20 text-center">
                        <Flame className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                        <h3 className="text-white font-black uppercase italic text-xl">No Deals Found</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
