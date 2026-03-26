import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { BarChart3, Package, Tag, ShoppingCart, LogOut, Settings as SettingsIcon } from "lucide-react";

export function AdminLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Sidebar Mapping */}
            <aside className="w-full md:w-64 bg-card border-r border-black/5 flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-black/5 bg-secondary/30">
                    <h1 className="font-heading font-black text-2xl uppercase tracking-tighter italic text-primary drop-shadow">Admin System</h1>
                </div>
                
                <nav className="flex-grow p-4 space-y-2">
                    <NavLink to="/admin/dashboard" className={({ isActive }) => `flex items-center gap-3 p-4 rounded-none font-black text-[10px] uppercase tracking-widest transition-colors ${isActive ? "bg-primary text-white shadow-xl shadow-primary/20" : "hover:bg-black/5 text-muted-foreground hover:text-foreground"}`}>
                        <BarChart3 className="h-4 w-4" /> Metrics Dashboard
                    </NavLink>
                    <NavLink to="/admin/products" className={({ isActive }) => `flex items-center gap-3 p-4 rounded-none font-black text-[10px] uppercase tracking-widest transition-colors ${isActive ? "bg-primary text-white shadow-xl shadow-primary/20" : "hover:bg-black/5 text-muted-foreground hover:text-foreground"}`}>
                        <Package className="h-4 w-4" /> Asset Inventory
                    </NavLink>
                    <NavLink to="/admin/coupons" className={({ isActive }) => `flex items-center gap-3 p-4 rounded-none font-black text-[10px] uppercase tracking-widest transition-colors ${isActive ? "bg-primary text-white shadow-xl shadow-primary/20" : "hover:bg-black/5 text-muted-foreground hover:text-foreground"}`}>
                        <Tag className="h-4 w-4" /> Promo Configurator
                    </NavLink>
                    <NavLink to="/admin/orders" className={({ isActive }) => `flex items-center gap-3 p-4 rounded-none font-black text-[10px] uppercase tracking-widest transition-colors ${isActive ? "bg-primary text-white shadow-xl shadow-primary/20" : "hover:bg-black/5 text-muted-foreground hover:text-foreground"}`}>
                        <ShoppingCart className="h-4 w-4" /> Operations (Orders)
                    </NavLink>
                    <NavLink to="/admin/settings" className={({ isActive }) => `flex items-center gap-3 p-4 rounded-none font-black text-[10px] uppercase tracking-widest transition-colors ${isActive ? "bg-primary text-white shadow-xl shadow-primary/20" : "hover:bg-black/5 text-muted-foreground hover:text-foreground"}`}>
                        <SettingsIcon className="h-4 w-4" /> Configuration
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-black/5">
                    <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 p-4 text-[10px] uppercase font-black tracking-widest text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded transition-colors">
                        <LogOut className="h-4 w-4" /> Terminate Session
                    </button>
                </div>
            </aside>

            {/* Injected Content Views */}
            <main className="flex-grow bg-background overflow-x-hidden relative">
                <Outlet />
            </main>
        </div>
    );
}
