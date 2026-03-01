"use client";

import { Hourglass, Plus, Search, Edit2, Trash2, CalendarClock } from "lucide-react";
import { useState } from "react";

export default function AdminDropsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const mockDrops = [
        { id: "dr1", name: "Exclusive Bugatti Divo", date: "2024-04-15T18:00:00Z", limit: 50, stock: 50, isLimited: true, status: "Scheduled" },
        { id: "dr2", name: "Retro JDM Pack", date: "2024-03-20T12:00:00Z", limit: 100, stock: 15, isLimited: true, status: "Active" },
        { id: "dr3", name: "F1 Champions Series", date: "2024-01-10T09:00:00Z", limit: 200, stock: 0, isLimited: true, status: "Sold Out" },
    ];

    const filteredDrops = mockDrops.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-10 space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Limited <span className="text-neon-orange">Drops</span></h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Manage high-demand product launches</p>
                </div>
                <button
                    className="bg-neon-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-orange-600 transition-all shadow-[0_20px_40px_rgba(255,92,0,0.2)] active:scale-95"
                >
                    <Plus className="w-4 h-4" /> Create Drop
                </button>
            </header>

            {/* Toolbar */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-6">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon-orange transition-colors" />
                    <input
                        type="text"
                        placeholder="Search drops by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-orange/50 transition-all font-bold"
                    />
                </div>
                <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                    Showing <span className="text-white">{filteredDrops.length}</span> Drops
                </div>
            </div>

            {/* Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/40 border-b border-white/10">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Drop Name</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Drop Date & Time</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Stock Limit</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Available Stock</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredDrops.map((drop) => (
                            <tr key={drop.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-white">{drop.name}</span>
                                        {drop.isLimited && <span className="text-[10px] text-neon-orange uppercase font-bold tracking-widest mt-1">Limited Badge</span>}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        <CalendarClock className="w-4 h-4 text-gray-500" />
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-300">{new Date(drop.date).toLocaleDateString()}</span>
                                            <span className="text-[10px] font-bold text-gray-500">{new Date(drop.date).toLocaleTimeString()}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-sm font-black text-white">{drop.limit} Units</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`text-sm font-black ${drop.stock === 0 ? "text-red-500" : drop.stock < 20 ? "text-yellow-500" : "text-green-500"}`}>
                                        {drop.stock} Remaining
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                                        drop.status === "Scheduled" ? "bg-blue-500/20 text-blue-500" :
                                        drop.status === "Active" ? "bg-green-500/20 text-green-500" :
                                        "bg-red-500/20 text-red-500"
                                    }`}>
                                        {drop.status}
                                    </span>
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
                {filteredDrops.length === 0 && (
                    <div className="py-20 text-center">
                        <Hourglass className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                        <h3 className="text-white font-black uppercase italic text-xl">No Drops Scheduled</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
