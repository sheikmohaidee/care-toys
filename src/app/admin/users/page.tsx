"use client";

import { Users, Search, Ban, CheckCircle, Shield } from "lucide-react";
import { useState } from "react";

export default function AdminUsersPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const mockUsers = [
        { id: "u1", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", orders: 15 },
        { id: "u2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", orders: 3 },
        { id: "u3", name: "Alice Johnson", email: "alice@example.com", role: "User", status: "Blocked", orders: 0 },
        { id: "u4", name: "Bob Brown", email: "bob@example.com", role: "Moderator", status: "Active", orders: 8 },
    ];

    const filteredUsers = mockUsers.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-10 space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">User <span className="text-neon-orange">Management</span></h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Manage roles and permissions</p>
                </div>
            </header>

            {/* Toolbar */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-6">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon-orange transition-colors" />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-orange/50 transition-all font-bold"
                    />
                </div>
                <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                    Showing <span className="text-white">{filteredUsers.length}</span> Users
                </div>
            </div>

            {/* Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/40 border-b border-white/10">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">User</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Email</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Role</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Orders</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center border border-white/5">
                                            <span className="text-white font-black text-sm uppercase">{user.name.charAt(0)}</span>
                                        </div>
                                        <span className="text-sm font-black text-white">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-xs font-bold text-gray-400">{user.email}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${
                                        user.role === "Admin" ? "bg-purple-500/20 text-purple-500 border-purple-500/30" :
                                        user.role === "Moderator" ? "bg-blue-500/20 text-blue-500 border-blue-500/30" :
                                        "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                                        user.status === "Active" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                                    }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-sm font-black text-white">{user.orders}</span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors" title="Change Role">
                                            <Shield className="w-4 h-4" />
                                        </button>
                                        <button
                                            className={`p-2 transition-colors ${user.status === 'Active' ? 'text-gray-500 hover:text-red-500' : 'text-gray-500 hover:text-green-500'}`}
                                            title={user.status === 'Active' ? 'Block User' : 'Unblock User'}
                                        >
                                            {user.status === 'Active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="py-20 text-center">
                        <Users className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                        <h3 className="text-white font-black uppercase italic text-xl">No Users Found</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
