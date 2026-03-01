"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    Package,
    Tags,
    ShoppingCart,
    Users,
    Ticket,
    Flame,
    Hourglass,
    Archive,
    Settings,
    Home,
    LogOut
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Categories", href: "/admin/categories", icon: Tags },
        { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Coupons", href: "/admin/coupons", icon: Ticket },
        { name: "Deals", href: "/admin/deals", icon: Flame },
        { name: "Drops", href: "/admin/drops", icon: Hourglass },
        { name: "Inventory", href: "/admin/inventory", icon: Archive },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-deep-navy text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-black/20 flex flex-col">
                <div className="p-8 border-b border-white/10">
                    <Link href="/" className="text-2xl font-black italic tracking-tighter text-white flex items-center gap-2">
                        CARE<span className="text-neon-orange">ADMIN</span>
                    </Link>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${isActive
                                        ? "bg-neon-orange text-white"
                                        : "text-gray-500 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-white/10 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-white font-bold uppercase tracking-widest text-xs transition-all"
                    >
                        <Home className="w-4 h-4" />
                        View Site
                    </Link>
                    <button
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-racing-red font-bold uppercase tracking-widest text-xs transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
