"use client";

import { Plus, Search, Edit2, Trash2, Tags } from "lucide-react";
import { useState } from "react";

export default function AdminCategoriesPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const mockCategories = [
        { id: "c1", name: "Hot Wheels", items: 45, image: "hw.jpg" },
        { id: "c2", name: "Die-Cast Cars", items: 120, image: "diecast.jpg" },
        { id: "c3", name: "Racing Tracks", items: 15, image: "tracks.jpg" },
        { id: "c4", name: "RC Cars", items: 32, image: "rc.jpg" },
    ];

    const filteredCategories = mockCategories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-10 space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Manage <span className="text-neon-orange">Categories</span></h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Organize your inventory</p>
                </div>
                <button
                    className="bg-neon-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-orange-600 transition-all shadow-[0_20px_40px_rgba(255,92,0,0.2)] active:scale-95"
                >
                    <Plus className="w-4 h-4" /> Add Category
                </button>
            </header>

            {/* Toolbar */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-6">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon-orange transition-colors" />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-orange/50 transition-all font-bold"
                    />
                </div>
                <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                    Showing <span className="text-white">{filteredCategories.length}</span> Categories
                </div>
            </div>

            {/* Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/40 border-b border-white/10">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Image</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Category Name</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Products Count</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredCategories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="w-12 h-10 bg-black/40 rounded-lg flex items-center justify-center border border-white/5 relative overflow-hidden">
                                        <Tags className="w-4 h-4 text-gray-500" />
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-sm font-black text-white uppercase italic tracking-tight">{cat.name}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-sm font-black text-gray-400">{cat.items} Items</span>
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
                {filteredCategories.length === 0 && (
                    <div className="py-20 text-center">
                        <Tags className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                        <h3 className="text-white font-black uppercase italic text-xl">No Categories Found</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
