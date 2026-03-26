import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { productsApi } from "@/lib/api";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        productsApi.getAll()
            .then(res => {
                if (res.data && res.data.success) {
                    setProducts(res.data.data);
                }
            })
            .catch(err => {
                console.error("Failed to load featured products", err);
            });
    }, []);

    return (
        <section className="py-24 bg-background">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="flex flex-col items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <span className="h-[2px] w-8 bg-primary" />
                            <span className="text-[10px] text-primary font-black uppercase tracking-[0.5em]">Inventory Selects</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter italic"
                        >
                            ELITE <span className="text-primary italic">ARCHIVAL</span> GEAR
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link to="/shop">
                            <Button variant="outline" className="group border-black/10 hover:border-primary px-8 py-6 rounded-none font-black italic uppercase tracking-[0.2em] text-[10px] text-foreground">
                                VIEW ALL ASSETS <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.slice(0, 4).map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard 
                                id={product.id.toString()}
                                name={product.name}
                                price={product.price}
                                image={product.image_url || '/placeholder.jpg'}
                                category={product.category_id?.toString() || "Model"} 
                            />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                </div>
            </div>
        </section>
    );
}
