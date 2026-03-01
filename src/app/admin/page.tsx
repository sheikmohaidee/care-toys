"use client";

import { useProducts } from "@/context/ProductContext";
import { Package, TrendingUp, AlertTriangle, Users, ShoppingCart, DollarSign } from "lucide-react";

export default function AdminDashboard() {
    const { products } = useProducts();

    // Mocking total orders and users for now since there's no dynamic context yet
    const totalOrders = 154;
    const totalUsers = 89;
    const totalRevenue = products.reduce((acc, p) => acc + p.price, 0) * 12; // Example value

    const stats = [
        { name: "Total Revenue (Monthly)", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-green-500" },
        { name: "Total Orders", value: totalOrders, icon: ShoppingCart, color: "text-blue-500" },
        { name: "Total Products", value: products.length, icon: Package, color: "text-purple-500" },
        { name: "Total Users", value: totalUsers, icon: Users, color: "text-orange-500" },
        { name: "Low Stock Alerts", value: products.filter(p => (p.stock || 0) < 10).length, icon: AlertTriangle, color: "text-red-500" },
    ];

    return (
        <div className="p-10 space-y-10">
            <header>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter">Command <span className="text-neon-orange">Center</span></h1>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Manage your high-performance inventory</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:col-span-2">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6">Recent Orders</h3>
                    <div className="space-y-4">
                        {[
                            { id: "#1001", customer: "John Doe", total: "$120.00", status: "Shipped", time: "2H AGO" },
                            { id: "#1002", customer: "Jane Smith", total: "$45.50", status: "Pending", time: "5H AGO" },
                            { id: "#1003", customer: "Alice Johnson", total: "$310.00", status: "Delivered", time: "1D AGO" },
                            { id: "#1004", customer: "Bob Brown", total: "$89.99", status: "Confirmed", time: "2D AGO" },
                            { id: "#1005", customer: "Charlie Davis", total: "$15.00", status: "Pending", time: "2D AGO" },
                        ].map(order => (
                            <div key={order.id} className="flex items-center gap-4 text-sm bg-black/40 p-4 rounded-xl border border-white/5">
                                <div className="flex-1">
                                    <span className="text-white font-bold">{order.id}</span>
                                    <span className="text-gray-500 ml-2">- {order.customer}</span>
                                </div>
                                <div className="text-white font-bold">{order.total}</div>
                                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                                    order.status === "Delivered" ? "bg-green-500/20 text-green-500" :
                                    order.status === "Shipped" ? "bg-blue-500/20 text-blue-500" :
                                    order.status === "Confirmed" ? "bg-purple-500/20 text-purple-500" :
                                    "bg-yellow-500/20 text-yellow-500"
                                }`}>
                                    {order.status}
                                </div>
                                <span className="text-gray-600 text-[10px] font-bold min-w-[50px] text-right">{order.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
