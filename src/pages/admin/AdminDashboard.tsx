import { useState, useEffect } from "react";
import { Package, ShoppingCart, Users, TrendingUp, AlertTriangle, IndianRupee, Ticket } from "lucide-react";
import { adminApi, ordersApi } from "@/lib/api";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ 
        total_products: 0, 
        total_orders: 0, 
        total_users: 0,
        total_revenue: 0,
        active_coupons: 0,
        low_stock_items: [] as any[]
    });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardInfo = async () => {
            try {
                const [statsRes, ordersRes] = await Promise.all([
                    adminApi.getStats(),
                    ordersApi.getAll()
                ]);

                if (statsRes.data.success) {
                    setStats(statsRes.data.data);
                }
                
                if (ordersRes.data.success) {
                    // Pull last 5 orders
                    setRecentOrders(ordersRes.data.data.slice(0, 5));
                }
            } catch (err) {
                console.error("Dashboard Sync Failed:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardInfo();
    }, []);

    if (loading) return <div className="p-12 font-black uppercase tracking-widest text-primary animate-pulse">Initializing Metrics...</div>;

    return (
        <div className="p-8 lg:p-12">
            <header className="mb-12">
                <h1 className="text-4xl font-heading font-black uppercase italic tracking-tighter text-foreground">Sector <span className="text-primary">Metrics</span></h1>
                <p className="text-muted-foreground mt-2 text-[10px] font-bold uppercase tracking-widest">Global Administrative Overview</p>
            </header>

            {/* Stat Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                <div className="bg-card border border-black/5 p-6 shadow-xl relative overflow-hidden group hover:border-primary transition-colors">
                    <div className="absolute -right-4 -top-4 text-black/[0.03] group-hover:text-primary/10 transition-colors"><IndianRupee className="w-24 h-24" /></div>
                    <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground mb-4 relative z-10">Net Yields</h3>
                    <div className="text-4xl font-black italic tracking-tighter text-primary relative z-10">₹{stats.total_revenue}</div>
                </div>

                <div className="bg-card border border-black/5 p-6 shadow-xl relative overflow-hidden group hover:border-primary transition-colors">
                    <div className="absolute -right-4 -top-4 text-black/[0.03] group-hover:text-primary/10 transition-colors"><ShoppingCart className="w-24 h-24" /></div>
                    <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground mb-4 relative z-10">Invoices</h3>
                    <div className="text-4xl font-black italic tracking-tighter text-foreground relative z-10">{stats.total_orders}</div>
                </div>

                <div className="bg-card border border-black/5 p-6 shadow-xl relative overflow-hidden group hover:border-primary transition-colors">
                    <div className="absolute -right-4 -top-4 text-black/[0.03] group-hover:text-primary/10 transition-colors"><Package className="w-24 h-24" /></div>
                    <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground mb-4 relative z-10">Asset Pool</h3>
                    <div className="text-4xl font-black italic tracking-tighter text-foreground relative z-10">{stats.total_products}</div>
                </div>

                <div className="bg-card border border-black/5 p-6 shadow-xl relative overflow-hidden group hover:border-primary transition-colors">
                    <div className="absolute -right-4 -top-4 text-black/[0.03] group-hover:text-primary/10 transition-colors"><Ticket className="w-24 h-24" /></div>
                    <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground mb-4 relative z-10">Live Promos</h3>
                    <div className="text-4xl font-black italic tracking-tighter text-foreground relative z-10">{stats.active_coupons}</div>
                </div>

                <div className="bg-card border border-black/5 p-6 shadow-xl relative overflow-hidden group hover:border-primary transition-colors">
                    <div className="absolute -right-4 -top-4 text-black/[0.03] group-hover:text-primary/10 transition-colors"><Users className="w-24 h-24" /></div>
                    <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground mb-4 relative z-10">Personnel</h3>
                    <div className="text-4xl font-black italic tracking-tighter text-foreground relative z-10">{stats.total_users}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Low Stock Targets */}
                <div className="lg:col-span-1 bg-card border border-black/5 shadow-xl relative overflow-hidden">
                    <div className="bg-destructive/10 p-4 border-b border-destructive/20 flex items-center gap-3">
                        <AlertTriangle className="text-destructive h-5 w-5" />
                        <h2 className="font-black text-[12px] text-destructive uppercase tracking-[0.2em]">Warning Vectors (Stock)</h2>
                    </div>
                    {stats.low_stock_items.length === 0 ? (
                        <div className="p-8 text-center text-[10px] tracking-widest uppercase font-black text-muted-foreground">All parameters stable.</div>
                    ) : (
                        <div className="divide-y divide-black/5">
                            {stats.low_stock_items.map(item => (
                                <div key={item.id} className="p-4 flex justify-between items-center hover:bg-black/[0.02] transition-colors">
                                    <div className="truncate pr-4">
                                        <div className="text-xs font-bold uppercase truncate">{item.name}</div>
                                        <div className="text-[10px] text-muted-foreground tracking-widest uppercase mt-1">ID: #{item.id}</div>
                                    </div>
                                    <div className="bg-destructive text-white px-2 py-1 text-[10px] font-black rounded shrink-0">
                                        {item.stock} LEFT
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Operations Feed */}
                <div className="lg:col-span-2 bg-card border border-black/5 shadow-xl">
                    <div className="p-6 border-b border-black/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="text-primary h-5 w-5" />
                            <h2 className="font-black text-xl uppercase italic tracking-tighter">Live Traffic</h2>
                        </div>
                    </div>

                    {recentOrders.length === 0 ? (
                        <div className="text-center text-[10px] tracking-widest uppercase font-black text-muted-foreground py-12">No historical logs isolated.</div>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="bg-secondary/50 text-[10px] uppercase font-black text-muted-foreground tracking-widest">
                                <tr>
                                    <th className="p-4 border-b border-black/5">INV</th>
                                    <th className="p-4 border-b border-black/5">Client</th>
                                    <th className="p-4 border-b border-black/5">Status</th>
                                    <th className="p-4 border-b border-black/5 text-right">Yield</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-black/[0.02] transition-colors">
                                        <td className="p-4 font-bold text-muted-foreground text-xs uppercase">ORD-{order.id}</td>
                                        <td className="p-4 font-bold tracking-tight uppercase text-xs">{order.customer_name || 'Guest Access'}</td>
                                        <td className="p-4">
                                            <span className={`uppercase text-[9px] font-black tracking-widest px-2 py-1 rounded ${
                                                order.status === 'completed' || order.status === 'delivered' ? 'bg-green-500/10 text-green-600' :
                                                order.status === 'cancelled' ? 'bg-destructive/10 text-destructive' :
                                                'bg-amber-500/10 text-amber-600'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 font-black text-primary text-right italic tracking-tighter">₹{order.total_amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
