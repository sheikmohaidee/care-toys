import { Button } from "@/components/ui/button";
import { Package, Users, Tag, BarChart3, Plus, Search, Edit, Trash2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { productsApi } from "@/lib/api";

export default function Admin() {
    const [activeTab, setActiveTab] = useState("products");
    
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [currentProduct, setCurrentProduct] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category_id: "1", // Default Category
        stock: "10",
        description: "",
        image_url: ""
    });

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await productsApi.getAll();
            if (res.data.success) {
                setProducts(res.data.data);
            }
        } catch (e) {
            console.error(e);
            setError("Failed to load products from backend");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "products") {
            fetchProducts();
        }
    }, [activeTab]);

    const openAddModal = () => {
        setModalMode("add");
        setFormData({ name: "", price: "", category_id: "1", stock: "10", description: "", image_url: "" });
        setIsModalOpen(true);
    };

    const openEditModal = (product: any) => {
        setModalMode("edit");
        setCurrentProduct(product);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            category_id: product.category_id?.toString() || "1",
            stock: product.stock.toString(),
            description: product.description || "",
            image_url: product.image_url || ""
        });
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                category_id: parseInt(formData.category_id)
            };

            if (modalMode === "add") {
                await productsApi.create(payload);
            } else {
                await productsApi.update(currentProduct.id, payload);
            }

            setIsModalOpen(false);
            fetchProducts(); // Refresh list
        } catch (e: any) {
            console.error(e);
            alert("Operation failed: " + (e.response?.data?.message || e.message));
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you absolutely sure you want to delete "${name}"? This action cannot be undone.`)) {
            try {
                await productsApi.delete(id);
                fetchProducts();
            } catch (e: any) {
                console.error(e);
                alert("Delete failed: " + (e.response?.data?.message || e.message));
            }
        }
    };

    const renderProductsTab = () => {
        if (loading) return <div className="p-6 font-bold uppercase tracking-widest text-primary">Loading Backend Data...</div>;
        if (error) return <div className="p-6 font-bold text-destructive uppercase tracking-widest">{error}</div>;

        return (
            <div className="p-6">
                <div className="bg-card border border-white/5 rounded-none overflow-hidden shadow-xl">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary/50 text-[10px] uppercase font-black text-muted-foreground tracking-widest">
                            <tr>
                                <th className="p-4 border-b border-black/5">ID</th>
                                <th className="p-4 border-b border-black/5">Product Name</th>
                                <th className="p-4 border-b border-black/5">Price</th>
                                <th className="p-4 border-b border-black/5">Stock</th>
                                <th className="p-4 border-b border-black/5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-muted-foreground uppercase font-black tracking-widest text-[10px]">No products found in the database.</td>
                                </tr>
                            ) : products.map((product) => (
                                <tr key={product.id} className="hover:bg-black/[0.02] transition-colors">
                                    <td className="p-4 font-bold text-muted-foreground">#{product.id}</td>
                                    <td className="p-4 font-bold uppercase tracking-tighter italic">{product.name}</td>
                                    <td className="p-4 font-black text-primary">₹{product.price}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[10px] uppercase tracking-widest font-black ${product.stock > 0 ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"}`}>
                                            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-3">
                                        <button onClick={() => openEditModal(product)} className="text-foreground hover:text-primary transition-colors uppercase font-black text-[10px] tracking-widest">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(product.id.toString(), product.name)} className="text-muted-foreground hover:text-destructive transition-colors uppercase font-black text-[10px] tracking-widest">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background flex pt-24 lg:pt-32">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-black/5 hidden md:flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-black/5">
                    <h1 className="font-heading font-black text-2xl uppercase tracking-tighter italic text-primary">System Admin</h1>
                </div>
                <nav className="flex-grow p-4 space-y-2">
                    <button onClick={() => setActiveTab("dashboard")} className={`w-full flex items-center gap-3 p-3 rounded-none font-black text-[10px] uppercase tracking-widest transition-colors ${activeTab === "dashboard" ? "bg-primary text-white" : "hover:bg-black/5 text-muted-foreground hover:text-foreground"}`}><BarChart3 className="h-4 w-4" /> Metrics</button>
                    <button onClick={() => setActiveTab("products")} className={`w-full flex items-center gap-3 p-3 rounded-none font-black text-[10px] uppercase tracking-widest transition-colors ${activeTab === "products" ? "bg-primary text-white" : "hover:bg-black/5 text-muted-foreground hover:text-foreground"}`}><Package className="h-4 w-4" /> Inventory</button>
                    <button onClick={() => setActiveTab("users")} className={`w-full flex items-center gap-3 p-3 rounded-none font-black text-[10px] uppercase tracking-widest transition-colors ${activeTab === "users" ? "bg-primary text-white" : "hover:bg-black/5 text-muted-foreground hover:text-foreground"}`}><Users className="h-4 w-4" /> Personnel</button>
                    <button onClick={() => setActiveTab("drops")} className={`w-full flex items-center gap-3 p-3 rounded-none font-black text-[10px] uppercase tracking-widest transition-colors ${activeTab === "drops" ? "bg-primary text-white" : "hover:bg-black/5 text-muted-foreground hover:text-foreground"}`}><Tag className="h-4 w-4" /> Deployments</button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-grow bg-background overflow-x-hidden relative">
                <header className="h-20 border-b border-black/5 flex items-center justify-between px-6 bg-card/80 backdrop-blur z-10 sticky top-0">
                    <h2 className="font-black text-xl uppercase tracking-tighter italic">
                        {activeTab === "dashboard" && "Sector Metrics"}
                        {activeTab === "products" && "Asset Inventory"}
                        {activeTab === "users" && "Personnel Operations"}
                        {activeTab === "drops" && "Deployment Schedule"}
                    </h2>
                    
                    {activeTab === "products" && (
                        <div className="flex items-center gap-4">
                            <Button onClick={openAddModal} className="font-black italic tracking-widest uppercase rounded-none bg-primary text-white hover:bg-foreground transition-all shadow-lg text-[10px] py-4">
                                <Plus className="h-4 w-4 mr-2" /> Inject Asset
                            </Button>
                        </div>
                    )}
                </header>

                {activeTab === "products" && renderProductsTab()}
                {activeTab !== "products" && (
                    <div className="p-12 text-center">
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-muted-foreground">Module under development.</h3>
                    </div>
                )}
            </main>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-background border border-border w-full max-w-lg shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                        
                        <div className="p-6 border-b border-black/5 flex justify-between items-center bg-card">
                            <h2 className="font-heading font-black text-2xl uppercase italic tracking-tighter">{modalMode === "add" ? "Inject Asset" : "Modify Asset"}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-destructive transition-colors"><X className="h-6 w-6" /></button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Designation (Name)</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-input border border-border rounded-none p-3 text-sm focus:ring-1 focus:ring-primary focus:outline-none" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Valuation (Price)</label>
                                    <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-input border border-border rounded-none p-3 text-sm focus:ring-1 focus:ring-primary focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Stock Level</label>
                                    <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full bg-input border border-border rounded-none p-3 text-sm focus:ring-1 focus:ring-primary focus:outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Category Routing ID</label>
                                <input required type="number" value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} className="w-full bg-input border border-border rounded-none p-3 text-sm focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-muted-foreground/30" placeholder="e.g. 1" />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Image Origin (URL)</label>
                                <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full bg-input border border-border rounded-none p-3 text-sm focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-muted-foreground/30" placeholder="https://..." />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Intelligence (Description)</label>
                                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-input border border-border rounded-none p-3 text-sm focus:ring-1 focus:ring-primary focus:outline-none resize-none" />
                            </div>

                            <Button type="submit" className="w-full mt-4 font-black italic tracking-widest uppercase rounded-none py-6 bg-primary text-white hover:bg-foreground transition-all">
                                {modalMode === "add" ? "Save Asset to Database" : "Commit Modifications"}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
