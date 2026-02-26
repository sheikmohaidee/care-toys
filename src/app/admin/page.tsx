"use client";

import { useProducts } from "@/context/ProductContext";
import { Package, TrendingUp, AlertTriangle, Tag } from "lucide-react";

export default function AdminDashboard() {
    const { products } = useProducts();

    const stats = [
        { name: "Total Products", value: products.length, icon: Package, color: "text-blue-500" },
        { name: "Total Value", value: `$${products.reduce((acc, p) => acc + p.price, 0).toFixed(2)}`, icon: TrendingUp, color: "text-green-500" },
        { name: "Low Stock", value: products.filter(p => (p.stock || 0) < 10).length, icon: AlertTriangle, color: "text-red-500" },
        { name: "Categories", value: new Set(products.map(p => p.category)).size, icon: Tag, color: "text-purple-500" },
    ];

    return (
        <div className="p-10 space-y-10">
            <header>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter">Command <span className="text-neon-orange">Center</span></h1>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Manage your high-performance inventory</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-white/20 transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Active</span>
                            </div>
                            <div className="text-3xl font-black">{stat.value}</div>
                            <div className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">{stat.name}</div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-4 text-sm">
                                <div className="w-2 h-2 bg-neon-orange rounded-full"></div>
                                <div className="flex-1">
                                    <span className="text-white font-bold">New product added:</span>
                                    <span className="text-gray-500 ml-2">McLaren P1 GTR</span>
                                </div>
                                <span className="text-gray-600 text-[10px] font-bold">2H AGO</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6">System Health</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Inventory Sync</span>
                            <span className="text-green-500 text-[10px] font-black uppercase">Operational</span>
                        </div>
                        <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Local Storage</span>
                            <span className="text-green-500 text-[10px] font-black uppercase">Connected</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
