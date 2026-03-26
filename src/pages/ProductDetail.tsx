import { useState, useEffect } from "react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCart } from "@/lib/cart-context";
import { productsApi } from "@/lib/api";

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;
        productsApi.getById(id)
            .then(res => {
                if (res.data.success) {
                    setProduct(res.data.data);
                } else {
                    setError("Product not found");
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load product details");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="min-h-screen pt-40 text-center uppercase tracking-widest font-black text-primary">LOADING ARCHIVE...</div>;
    if (error || !product) return <div className="min-h-screen pt-40 text-center uppercase tracking-widest font-black text-destructive">{error || "Product not found"}</div>;

    const handleAddToCart = () => {
        addToCart({
            id: product.id.toString(),
            name: product.name,
            price: product.price,
            category: product.category_id?.toString() || "Model",
            image: product.image_url || '/placeholder.jpg'
        });
    };

    const handleWhatsAppOrder = () => {
        const phoneNumber = "918015293181";
        const currentUrl = window.location.href;
        const message = `Hi, I'm interested in ${product.name}. \nPrice: ₹${product.price} \nLink: ${currentUrl}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-background pb-12 pt-40 lg:pb-20 lg:pt-48">
            <div className="container px-4 mx-auto max-w-7xl">
                <Link to="/shop" className="inline-flex items-center text-muted-foreground hover:text-primary mb-12 transition-colors uppercase text-[10px] font-black tracking-widest">
                    <ArrowLeft className="mr-2 h-3 w-3" /> Back to Collective
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-start">
                    <div className="w-full lg:sticky lg:top-32 text-center">
                        <ProductGallery images={product.image_url ? [product.image_url] : []} />
                    </div>

                    <div className="space-y-10">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter text-foreground mb-6 italic leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-6 mb-8">
                                <div className="text-4xl font-black text-primary italic tracking-tighter">₹{product.price}</div>
                            </div>
                            <p className="text-muted-foreground">{product.description}</p>
                        </div>

                        <div className="space-y-4 pt-6">
                            <Button onClick={handleAddToCart} size="lg" className="w-full h-16 text-lg font-black uppercase italic tracking-widest bg-foreground text-background hover:bg-primary hover:text-white transition-all rounded-none border-none shadow-lg">
                                ADD TO GARAGE
                            </Button>
                            <Button onClick={handleWhatsAppOrder} variant="outline" size="lg" className="w-full h-16 text-lg font-black uppercase italic tracking-widest border-2 border-green-500/20 text-green-600 hover:bg-green-500 hover:text-white transition-all rounded-none">
                                <MessageCircle className="mr-3 h-5 w-5" /> ORDER FROM WHATSAPP
                            </Button>
                        </div>
                        
                        <div className="pt-8">
                            <h3 className="font-black uppercase tracking-[0.4em] text-xs text-primary mb-8 border-l-4 border-primary pl-4">Technical Specifications</h3>
                            <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-[10px] uppercase font-bold tracking-widest">
                                <div className="flex justify-between border-b border-black/5 pb-3">
                                    <span className="text-muted-foreground opacity-50 italic">Stock Status</span>
                                    <span className={product.stock > 0 ? "text-green-500" : "text-destructive"}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
                                </div>
                                <div className="flex justify-between border-b border-black/5 pb-3">
                                    <span className="text-muted-foreground opacity-50 italic">Archive Code</span>
                                    <span className="text-foreground">#{product.id.toString().padStart(4, '0')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
