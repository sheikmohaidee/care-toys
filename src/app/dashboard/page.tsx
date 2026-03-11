"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Dashboard() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <div className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                            <div className="flex items-center gap-3 px-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                                <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary/10 bg-slate-200 dark:bg-slate-800" />
                                <div className="overflow-hidden">
                                    <p className="truncate text-sm font-bold text-slate-900 dark:text-white">Alex Thompson</p>
                                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">Premium Member</p>
                                </div>
                            </div>
                            <nav className="flex flex-col gap-1">
                                <a href="#" className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2.5 text-sm font-semibold text-primary">
                                    <span className="material-symbols-outlined text-xl">person</span>
                                    Profile
                                </a>
                                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                                    <span className="material-symbols-outlined text-xl">package_2</span>
                                    Orders
                                </a>
                                <div className="my-2 border-t border-slate-100 dark:border-slate-800"></div>
                                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                                    <span className="material-symbols-outlined text-xl">logout</span>
                                    Logout
                                </a>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 space-y-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Hello, Collector!</h1>
                                <p className="mt-1 text-slate-500 dark:text-slate-400">Welcome back to your dashboard.</p>
                            </div>
                        </div>

                        {/* User Info Card */}
                        <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl ring-4 ring-primary/10 shadow-lg bg-slate-200 dark:bg-slate-800" />
                                <div className="flex-1 space-y-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Alex Thompson</h2>
                                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                            Verified Collector
                                        </span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400">alex.collector@caretoys.com</p>
                                </div>
                                <button className="w-full sm:w-auto rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary/90">
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        {/* Recent Orders Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Orders</h2>
                            </div>
                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-50 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
                                            <tr>
                                                <th className="px-6 py-4 font-bold">Order ID</th>
                                                <th className="px-6 py-4 font-bold">Items</th>
                                                <th className="px-6 py-4 font-bold">Date</th>
                                                <th className="px-6 py-4 font-bold">Total</th>
                                                <th className="px-6 py-4 font-bold">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">#CT-89241</td>
                                                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Vintage Wooden Train Set</td>
                                                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Nov 12, 2023</td>
                                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">$124.50</td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                        Delivered
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}
