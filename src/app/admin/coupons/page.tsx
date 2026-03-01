"use client";

import { Ticket, Plus, Search, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AdminCouponsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const mockCoupons = [
        { id: "cp1", code: "SUMMER20", discountType: "Percentage", discountValue: "20%", expiry: "2024-08-31", usageCount: 45, usageLimit: 100, minOrder: "$50", status: "Active" },
        { id: "cp2", code: "WELCOME10", discountType: "Fixed", discountValue: "$10", expiry: "2024-12-31", usageCount: 120, usageLimit: 500, minOrder: "$30", status: "Active" },
        { id: "cp3", code: "FLASH50", discountType: "Percentage", discountValue: "50%", expiry: "2024-02-28", usageCount: 50, usageLimit: 50, minOrder: "$100", status: "Inactive" },
    ];

    const filteredCoupons = mockCoupons.filter(c =>
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-10 space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Coupon <span className="text-neon-orange">Management</span></h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Create and manage discount codes</p>
                </div>
                <button
                    className="bg-neon-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-orange-600 transition-all shadow-[0_20px_40px_rgba(255,92,0,0.2)] active:scale-95"
                >
                    <Plus className="w-4 h-4" /> Create Coupon
                </button>
            </header>

            {/* Toolbar */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-6">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon-orange transition-colors" />
                    <input
                        type="text"
                        placeholder="Search coupons by code..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-orange/50 transition-all font-bold"
                    />
                </div>
                <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                    Showing <span className="text-white">{filteredCoupons.length}</span> Coupons
                </div>
            </div>

            {/* Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/40 border-b border-white/10">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Code</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Discount</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Expiry</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Usage</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredCoupons.map((coupon) => (
                            <tr key={coupon.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-8 py-6">
                                    <span className="text-sm font-black text-white uppercase tracking-widest border border-white/10 bg-white/5 px-3 py-1 rounded">{coupon.code}</span>
                                    <div className="text-[10px] text-gray-500 mt-2 font-bold uppercase">Min Order: {coupon.minOrder}</div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="text-sm font-black text-neon-orange">{coupon.discountValue}</div>
                                    <div className="text-[10px] text-gray-500 mt-1 font-bold uppercase">{coupon.discountType}</div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-xs font-bold text-gray-400">{coupon.expiry}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-sm font-black text-white">{coupon.usageCount} <span className="text-gray-500 text-xs">/ {coupon.usageLimit}</span></span>
                                </td>
                                <td className="px-8 py-6">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked={coupon.status === "Active"} />
                                        <div className="w-9 h-5 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-orange"></div>
                                    </label>
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
                {filteredCoupons.length === 0 && (
                    <div className="py-20 text-center">
                        <Ticket className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                        <h3 className="text-white font-black uppercase italic text-xl">No Coupons Found</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
