import { Button } from "@/components/ui/button";
import { Plus, X, Search, Trash2, Filter, Upload, ImageIcon } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import { productsApi } from "@/lib/api";

export default function AdminProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Enhanced Feature States
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [currentProduct, setCurrentProduct] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: "", price: "", category_id: "1", stock: "10", description: "", image_url: "",
        isLimited: false, isDeal: false, isCollector: false
    });
    const [imageFile, setImageFile]       = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await productsApi.getAll();
            if (res.data.success) {
                setProducts(res.data.data);
            }
        } catch (e) {
            setError("Failed to load operations data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toString().includes(searchQuery);
            const matchesCategory = categoryFilter === "all" || p.category_id?.toString() === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, categoryFilter]);

    // Bulk Actions
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) setSelectedIds(filteredProducts.map(p => p.id));
        else setSelectedIds([]);
    };

    const handleSelectRow = (id: number) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;
        if (!window.confirm(`Permanently eradicate ${selectedIds.length} assets from the database?`)) return;
        
        try {
            // Processing sequentially to avoid overwhelming Hostinger
            for (const id of selectedIds) {
                await productsApi.delete(id.toString());
            }
            setSelectedIds([]);
            fetchProducts();
        } catch (e: any) {
            alert("Bulk Wipe Error");
        }
    };

    const openAddModal = () => {
        setModalMode("add");
        setFormData({ name: "", price: "", category_id: "1", stock: "10", description: "", image_url: "", isLimited: false, isDeal: false, isCollector: false });
        setImageFile(null);
        setImagePreview("");
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
            image_url: product.image_url || "",
            isLimited: !!product.isLimited,
            isDeal: !!product.isDeal,
            isCollector: !!product.isCollector
        });
        setImageFile(null);
        // Show existing image as preview
        setImagePreview(product.image_url ? `https://caretoys.in${product.image_url.startsWith('/') ? '' : '/'}${product.image_url}` : "");
        setIsModalOpen(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Client-side guard: size & type
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowed.includes(file.type)) {
            alert('Only JPG, PNG, or WEBP images allowed.');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert('Image must be under 2MB.');
            return;
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Always use FormData so the server receives multipart/form-data
            const fd = new FormData();
            fd.append('name',        formData.name);
            fd.append('price',       formData.price);
            fd.append('stock',       formData.stock);
            fd.append('category_id', formData.category_id);
            fd.append('description', formData.description);
            fd.append('isLimited',   formData.isLimited  ? 'true' : 'false');
            fd.append('isDeal',      formData.isDeal     ? 'true' : 'false');
            fd.append('isCollector', formData.isCollector ? 'true' : 'false');

            if (imageFile) {
                fd.append('image', imageFile);
            } else if (formData.image_url) {
                // Keep existing URL if no new file chosen
                fd.append('image_url', formData.image_url);
            }

            if (modalMode === "add") {
                await productsApi.create(fd);
            } else {
                // PHP update.php accepts POST with ?id= for FormData compatibility
                await productsApi.update(currentProduct.id, fd);
            }
            setIsModalOpen(false);
            setImageFile(null);
            setImagePreview("");
            fetchProducts();
        } catch (e: any) {
            alert(e.response?.data?.message || "Submission failed.");
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you absolutely sure you want to delete "${name}"?`)) {
            try {
                await productsApi.delete(id);
                fetchProducts();
            } catch (e: any) {
                alert("Delete failed");
            }
        }
    };

    if (loading) return <div className="p-12 font-black uppercase tracking-widest text-primary animate-pulse">Synchronizing Asset Index...</div>;
    if (error) return <div className="p-12 font-bold text-destructive uppercase tracking-widest">{error}</div>;

    return (
        <div className="p-8 lg:p-12 relative h-full flex flex-col">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-heading font-black uppercase italic tracking-tighter text-foreground">Asset <span className="text-primary">Inventory</span></h1>
                    <p className="text-muted-foreground mt-2 text-[10px] font-bold uppercase tracking-widest">Global Product Command Center</p>
                </div>
                <div className="flex gap-4">
                    {selectedIds.length > 0 && (
                        <Button onClick={handleBulkDelete} className="font-black italic tracking-widest uppercase rounded-none bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all text-xs py-6 px-6">
                            <Trash2 className="h-5 w-5 mr-3" /> Execute Purge ({selectedIds.length})
                        </Button>
                    )}
                    <Button onClick={openAddModal} className="font-black italic tracking-widest uppercase rounded-none bg-primary text-white hover:bg-foreground transition-all shadow-xl shadow-primary/20 text-xs py-6 px-8">
                        <Plus className="h-5 w-5 mr-3" /> Inject Asset
                    </Button>
                </div>
            </header>

            {/* Advanced Filters Bar */}
            <div className="bg-card border border-black/5 p-4 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                        type="text" 
                        placeholder="SEARCH BY DESIGNATION OR ID..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-input border border-black/5 rounded-none py-3 pl-10 pr-4 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <select 
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full bg-input border border-black/5 rounded-none py-3 pl-10 pr-4 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-primary focus:outline-none appearance-none cursor-pointer"
                    >
                        <option value="all">ALL CATEGORIES</option>
                        <option value="1">HOT WHEELS</option>
                        <option value="2">BARBIE</option>
                        <option value="3">LEGO</option>
                    </select>
                </div>
                <div className="flex items-center justify-end px-4">
                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Showing {filteredProducts.length} Items</p>
                </div>
            </div>

            <div className="bg-card border border-black/5 rounded-none overflow-hidden shadow-xl flex-grow overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-secondary/50 text-[10px] uppercase font-black text-muted-foreground tracking-widest">
                        <tr>
                            <th className="p-4 border-b border-black/5 w-10 text-center">
                                <input 
                                    type="checkbox" 
                                    checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0} 
                                    onChange={handleSelectAll}
                                    className="cursor-pointer"
                                />
                            </th>
                            <th className="p-4 border-b border-black/5">Identifier</th>
                            <th className="p-4 border-b border-black/5">Designation</th>
                            <th className="p-4 border-b border-black/5">Valuation</th>
                            <th className="p-4 border-b border-black/5">Aesthetics flags</th>
                            <th className="p-4 border-b border-black/5">Stock Level</th>
                            <th className="p-4 border-b border-black/5 text-right">Access Controls</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-muted-foreground uppercase font-black tracking-widest text-[10px]">No parameters logged matching constraints.</td>
                            </tr>
                        ) : filteredProducts.map((product) => {
                            const stockState = product.stock === 0 ? 'out' : product.stock < 10 ? 'low' : 'in';
                            return (
                                <tr key={product.id} className={`hover:bg-black/[0.02] transition-colors group ${selectedIds.includes(product.id) ? 'bg-primary/5' : ''}`}>
                                    <td className="p-4 text-center">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedIds.includes(product.id)}
                                            onChange={() => handleSelectRow(product.id)}
                                            className="cursor-pointer"
                                        />
                                    </td>
                                    <td className="p-4 font-bold text-muted-foreground text-xs uppercase">#{product.id}</td>
                                    <td className="p-4 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-secondary border border-black/5 flex-shrink-0 overflow-hidden">
                                            {product.image_url && <img src={product.image_url} alt="img" className="w-full h-full object-cover" />}
                                        </div>
                                        <span className="font-bold uppercase tracking-tight text-xs">{product.name}</span>
                                    </td>
                                    <td className="p-4 font-black text-primary text-lg tracking-tighter italic">₹{product.price}</td>
                                    <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                            {product.isLimited ? <span className="bg-black text-white px-1.5 py-0.5 text-[8px] uppercase tracking-widest font-black rounded">LTD</span> : null}
                                            {product.isDeal ? <span className="bg-red-500 text-white px-1.5 py-0.5 text-[8px] uppercase tracking-widest font-black rounded">DEAL</span> : null}
                                            {product.isCollector ? <span className="bg-amber-500 text-white px-1.5 py-0.5 text-[8px] uppercase tracking-widest font-black rounded">COLLECT</span> : null}
                                            {!product.isLimited && !product.isDeal && !product.isCollector && <span className="text-muted-foreground opacity-50 text-[9px] font-black uppercase tracking-widest">Standard</span>}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[9px] uppercase tracking-widest font-black inline-flex flex-col items-center ${
                                            stockState === 'out' ? 'bg-destructive/10 text-destructive' :
                                            stockState === 'low' ? 'bg-amber-500/10 text-amber-600' :
                                            'bg-green-500/10 text-green-600'
                                        }`}>
                                            <span className="text-[12px]">{product.stock}</span>
                                            {stockState === 'out' ? 'DEPLETED' : stockState === 'low' ? 'CRITICAL' : 'SECURE'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                                        <button onClick={() => openEditModal(product)} className="text-foreground hover:text-primary transition-colors uppercase font-black text-[9px] tracking-widest border border-black/10 px-3 py-1.5 hover:border-primary">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(product.id.toString(), product.name)} className="text-muted-foreground hover:text-white hover:bg-destructive hover:border-destructive transition-colors uppercase font-black text-[9px] tracking-widest border border-black/10 px-3 py-1.5">
                                            Wipe
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-background border border-border w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                        
                        <div className="p-6 border-b border-black/5 flex justify-between items-center bg-card flex-shrink-0">
                            <h2 className="font-heading font-black text-2xl uppercase italic tracking-tighter">{modalMode === "add" ? "Inject New Asset" : "Override Parameters"}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-destructive transition-colors"><X className="h-6 w-6" /></button>
                        </div>

                        <div className="overflow-y-auto p-8 border-b border-black/5">
                            <form id="productForm" onSubmit={handleFormSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Designation Index (Name)</label>
                                        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-input border border-border rounded-none p-4 text-sm font-bold focus:ring-1 focus:ring-primary focus:outline-none" />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Valuation Rating</label>
                                        <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-input border border-border rounded-none p-4 text-sm font-bold focus:ring-1 focus:ring-primary focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Stock Threshold</label>
                                        <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full bg-input border border-border rounded-none p-4 text-sm font-bold focus:ring-1 focus:ring-primary focus:outline-none" />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Product Image</label>
                                        
                                        {/* File picker zone */}
                                        <div
                                            className="border-2 border-dashed border-border hover:border-primary transition-colors rounded-none p-4 cursor-pointer"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            {imagePreview ? (
                                                <div className="flex items-center gap-4">
                                                    <img src={imagePreview} alt="preview" className="w-20 h-20 object-cover border border-black/10 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-xs font-bold uppercase tracking-widest">{imageFile ? imageFile.name : "Current image"}</p>
                                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Click to replace</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center gap-2 py-4 text-muted-foreground">
                                                    <Upload className="h-8 w-8" />
                                                    <p className="text-[10px] font-black uppercase tracking-widest">Click to upload image</p>
                                                    <p className="text-[9px] uppercase tracking-widest">JPG, PNG, WEBP — max 2MB</p>
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Description</label>
                                        <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-input border border-border rounded-none p-4 text-sm focus:ring-1 focus:ring-primary focus:outline-none resize-none" />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-black/5 mt-6">
                                    <h3 className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 border-l-2 border-primary pl-2">Modifier Tags</h3>
                                    <div className="flex flex-wrap gap-6">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" checked={formData.isLimited} onChange={e => setFormData({...formData, isLimited: e.target.checked})} className="w-5 h-5 text-primary border-black/20 focus:ring-primary" />
                                            <span className="text-sm font-bold uppercase tracking-widest group-hover:text-primary transition-colors">Limited Edition</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" checked={formData.isDeal} onChange={e => setFormData({...formData, isDeal: e.target.checked})} className="w-5 h-5 text-primary border-black/20 focus:ring-primary" />
                                            <span className="text-sm font-bold uppercase tracking-widest group-hover:text-primary transition-colors">Active Deal</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" checked={formData.isCollector} onChange={e => setFormData({...formData, isCollector: e.target.checked})} className="w-5 h-5 text-primary border-black/20 focus:ring-primary" />
                                            <span className="text-sm font-bold uppercase tracking-widest group-hover:text-primary transition-colors">Collector Status</span>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="p-6 bg-secondary/50 flex-shrink-0">
                            <Button form="productForm" type="submit" className="w-full h-16 text-lg font-black italic tracking-widest uppercase rounded-none bg-primary text-white hover:bg-foreground transition-all shadow-xl shadow-primary/20">
                                {modalMode === "add" ? "Initialize Asset" : "Confirm Modification"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
