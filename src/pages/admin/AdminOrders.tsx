import React, { useState, useEffect } from "react";
import { ShoppingCart, MessageSquare, ChevronDown, ChevronUp, User, MapPin, Phone } from "lucide-react";
import { ordersApi } from "@/lib/api";

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    // Tracks currently expanded order ID
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    // Caches order items locally upon expansion fetching
    const [orderDetailsCache, setOrderDetailsCache] = useState<Record<string, any>>({});
    const [detailsLoading, setDetailsLoading] = useState(false);

    const fetchOrders = async () => {
        try {
            const res = await ordersApi.getAll();
            if (res.data.success) {
                setOrders(res.data.data);
            }
        } catch (err) {
            console.error(err);
            setError("Failed fetching operations logs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const toggleExpand = async (orderId: string) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
            return;
        }
        
        setExpandedOrder(orderId);
        if (!orderDetailsCache[orderId]) {
            setDetailsLoading(true);
            try {
                const res = await ordersApi.getById(orderId);
                if (res.data.success) {
                    setOrderDetailsCache(prev => ({ ...prev, [orderId]: res.data.data.items }));
                }
            } catch (err) {
                console.error("Fetch Items Error:", err);
            } finally {
                setDetailsLoading(false);
            }
        }
    };

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            await ordersApi.updateStatus(orderId, newStatus);
            // Optimistic update locally
            setOrders(prev => prev.map(o => o.id.toString() === orderId.toString() ? { ...o, status: newStatus } : o));
        } catch (err) {
            alert("Status Update Failed.");
        }
    };

    const triggerWhatsApp = (order: any) => {
        const text = `Hello ${order.customer_name || 'Customer'}, regarding your Care Toys invoice (ORD-${order.id}) for ₹${order.total_amount}. Your current status is: ${order.status.toUpperCase()}.`;
        const waUrl = `https://wa.me/${order.customer_phone?.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, "_blank");
    };

    if (loading) return <div className="p-12 font-black uppercase tracking-widest text-primary animate-pulse">Initializing Terminal...</div>;
    if (error) return <div className="p-12 font-bold text-destructive uppercase tracking-widest">{error}</div>;

    return (
        <div className="p-8 lg:p-12 h-full flex flex-col">
            <header className="mb-12">
                <h1 className="text-4xl font-heading font-black uppercase italic tracking-tighter text-foreground flex items-center gap-4">
                    <ShoppingCart className="text-primary w-10 h-10" /> Global <span className="text-primary">CRM Tracking</span>
                </h1>
                <p className="text-muted-foreground mt-2 text-[10px] font-bold uppercase tracking-widest">Master Checkout Register & Client Relations</p>
            </header>

            <div className="bg-card border border-black/5 shadow-xl flex-grow overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-secondary/50 text-[10px] uppercase font-black text-muted-foreground tracking-widest">
                        <tr>
                            <th className="p-4 border-b border-black/5 whitespace-nowrap">Invoice</th>
                            <th className="p-4 border-b border-black/5">Client Sub-ID</th>
                            <th className="p-4 border-b border-black/5">Date Logged</th>
                            <th className="p-4 border-b border-black/5">Internal State</th>
                            <th className="p-4 border-b border-black/5 text-right">Net Valuation</th>
                            <th className="p-4 border-b border-black/5 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-muted-foreground uppercase font-black tracking-widest text-[10px]">No historical data vectors found.</td>
                            </tr>
                        ) : orders.map((order) => (
                            <React.Fragment key={order.id}>
                                <tr className={`transition-colors ${expandedOrder === order.id.toString() ? 'bg-primary/5' : 'hover:bg-black/[0.02]'}`}>
                                    <td className="p-4">
                                        <div className="font-black text-xs text-primary bg-primary/10 inline-flex px-2 py-1 rounded">ORD-{order.id}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold tracking-tight uppercase text-xs">{order.customer_name || 'Guest User'}</div>
                                        {order.customer_phone && <div className="text-[10px] text-muted-foreground mt-1 tracking-widest font-bold font-mono">{order.customer_phone}</div>}
                                    </td>
                                    <td className="p-4 text-[10px] font-bold tracking-widest uppercase text-muted-foreground whitespace-nowrap">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <select 
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id.toString(), e.target.value)}
                                            className={`uppercase text-[9px] font-black tracking-widest px-2 py-1 rounded border-none cursor-pointer outline-none focus:ring-1 focus:ring-primary ${
                                                order.status === 'completed' || order.status === 'delivered' ? 'bg-green-500/10 text-green-600' :
                                                order.status === 'cancelled' ? 'bg-destructive/10 text-destructive' :
                                                'bg-amber-500/10 text-amber-600'
                                            }`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-4 text-right">
                                        <span className="font-black text-foreground text-lg tracking-tighter italic">₹{order.total_amount}</span>
                                    </td>
                                    <td className="p-4 flex items-center justify-end gap-2">
                                        <button 
                                            onClick={() => triggerWhatsApp(order)}
                                            disabled={!order.customer_phone}
                                            className="p-2 bg-green-500/10 text-green-600 hover:bg-green-500 hover:text-white rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                            title="Initiate Secure WhatsApp Uplink"
                                        >
                                            <MessageSquare className="h-4 w-4" />
                                        </button>
                                        <button 
                                            onClick={() => toggleExpand(order.id.toString())}
                                            className="p-2 bg-secondary text-foreground hover:bg-primary hover:text-white rounded transition-colors"
                                        >
                                            {expandedOrder === order.id.toString() ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                        </button>
                                    </td>
                                </tr>
                                
                                {/* Expansion Drawer CRM Sub-Panel */}
                                {expandedOrder === order.id.toString() && (
                                    <tr className="bg-black/[0.02]">
                                        <td colSpan={6} className="p-0 border-none">
                                            <div className="p-6 lg:p-8 animate-in slide-in-from-top-4 fade-in duration-200">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    
                                                    {/* Client Logistics */}
                                                    <div className="space-y-4">
                                                        <h3 className="text-primary font-black uppercase text-[10px] tracking-widest flex items-center gap-2 border-l-2 border-primary pl-2"><User className="h-3 w-3" /> Personnel Payload</h3>
                                                        <div className="bg-background border border-black/5 p-4 space-y-3">
                                                            <div className="grid grid-cols-2 text-xs">
                                                                <span className="text-muted-foreground uppercase font-bold tracking-widest text-[9px]">Designation:</span>
                                                                <span className="font-medium">{order.customer_name || 'N/A'}</span>
                                                            </div>
                                                            <div className="grid grid-cols-2 text-xs border-t border-black/5 pt-3">
                                                                <span className="text-muted-foreground uppercase font-bold tracking-widest text-[9px] flex items-center gap-1"><Phone className="h-3 w-3"/> Comms Link:</span>
                                                                <span className="font-mono text-primary font-bold">{order.customer_phone || 'N/A'}</span>
                                                            </div>
                                                            <div className="grid grid-cols-2 text-xs border-t border-black/5 pt-3">
                                                                <span className="text-muted-foreground uppercase font-bold tracking-widest text-[9px] flex items-center gap-1"><MapPin className="h-3 w-3"/> Coordinates:</span>
                                                                <span className="font-medium">{order.customer_address || 'N/A'} {order.customer_city ? `(${order.customer_city})` : ''}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Asset Register */}
                                                    <div className="space-y-4">
                                                        <h3 className="text-primary font-black uppercase text-[10px] tracking-widest flex items-center gap-2 border-l-2 border-primary pl-2"><ShoppingCart className="h-3 w-3" /> Transferred Assets</h3>
                                                        <div className="bg-background border border-black/5 p-4">
                                                            {detailsLoading ? (
                                                                <div className="text-[10px] uppercase tracking-widest text-primary animate-pulse py-4 font-black">Syncing Arrays...</div>
                                                            ) : (
                                                                <div className="space-y-3">
                                                                    {orderDetailsCache[order.id.toString()]?.map((item: any) => (
                                                                        <div key={item.id} className="flex justify-between items-center text-xs pb-3 border-b border-black/5 last:border-0 last:pb-0">
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="w-8 h-8 bg-secondary rounded overflow-hidden flex-shrink-0">
                                                                                    {item.image_url ? <img src={item.image_url} alt="" className="w-full h-full object-cover" /> : null}
                                                                                </div>
                                                                                <div>
                                                                                    <div className="font-bold uppercase tracking-tight">{item.name}</div>
                                                                                    <div className="text-[9px] text-muted-foreground uppercase tracking-widest">QTY: {item.quantity}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="font-black italic tracking-tighter text-sm text-foreground">₹{item.price}</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
