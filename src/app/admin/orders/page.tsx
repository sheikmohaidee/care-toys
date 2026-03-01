"use client";

import { ShoppingCart, Search, Eye, Filter } from "lucide-react";
import { useState } from "react";

export default function AdminOrdersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const mockOrders = [
        { id: "#ORD-1001", customer: "John Doe", items: 3, total: "$120.00", status: "Shipped", date: "2024-03-01", payment: "Paid" },
        { id: "#ORD-1002", customer: "Jane Smith", items: 1, total: "$45.50", status: "Pending", date: "2024-03-01", payment: "Unpaid" },
        { id: "#ORD-1003", customer: "Alice Johnson", items: 5, total: "$310.00", status: "Delivered", date: "2024-02-28", payment: "Paid" },
        { id: "#ORD-1004", customer: "Bob Brown", items: 2, total: "$89.99", status: "Confirmed", date: "2024-02-27", payment: "Paid" },
        { id: "#ORD-1005", customer: "Charlie Davis", items: 1, total: "$15.00", status: "Cancelled", date: "2024-02-25", payment: "Refunded" },
    ];

    const filteredOrders = mockOrders.filter(o =>
        (statusFilter === "All" || o.status === statusFilter) &&
        (o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
         o.customer.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-10 space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Order <span className="text-neon-orange">Management</span></h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Track shipments and manage fulfillments</p>
                </div>
            </header>

            {/* Toolbar */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 w-full relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon-orange transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by order ID or customer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-orange/50 transition-all font-bold"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-black/20 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-neon-orange/50 font-bold"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/40 border-b border-white/10">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Order ID</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Customer</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Date</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Payment</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Total</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-8 py-6">
                                    <span className="text-sm font-black text-white">{order.id}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-sm font-bold text-gray-300">{order.customer}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-xs font-bold text-gray-500">{order.date}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                                        order.payment === "Paid" ? "bg-green-500/20 text-green-500" :
                                        order.payment === "Refunded" ? "bg-gray-500/20 text-gray-400" :
                                        "bg-yellow-500/20 text-yellow-500"
                                    }`}>
                                        {order.payment}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <select
                                        defaultValue={order.status}
                                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest focus:outline-none appearance-none cursor-pointer ${
                                            order.status === "Delivered" ? "bg-green-500/20 text-green-500 border border-green-500/30" :
                                            order.status === "Shipped" ? "bg-blue-500/20 text-blue-500 border border-blue-500/30" :
                                            order.status === "Confirmed" ? "bg-purple-500/20 text-purple-500 border border-purple-500/30" :
                                            order.status === "Cancelled" ? "bg-red-500/20 text-red-500 border border-red-500/30" :
                                            "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
                                        }`}
                                    >
                                        <option value="Pending" className="bg-black text-yellow-500">Pending</option>
                                        <option value="Confirmed" className="bg-black text-purple-500">Confirmed</option>
                                        <option value="Shipped" className="bg-black text-blue-500">Shipped</option>
                                        <option value="Delivered" className="bg-black text-green-500">Delivered</option>
                                        <option value="Cancelled" className="bg-black text-red-500">Cancelled</option>
                                    </select>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-sm font-black text-white">{order.total}</span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button className="p-2 text-gray-500 hover:text-white transition-colors">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredOrders.length === 0 && (
                    <div className="py-20 text-center">
                        <ShoppingCart className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                        <h3 className="text-white font-black uppercase italic text-xl">No Orders Found</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
