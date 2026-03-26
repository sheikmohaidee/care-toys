import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";

export function CategoryHighlights() {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-black uppercase text-[10px] tracking-[0.6em] mb-4"
                    >
                        The Collective
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-6 italic"
                    >
                        CURATED <span className="text-primary">ARCHIVES</span>
                    </motion.h2>
                    <div className="h-px w-24 bg-black/10" />
                </div>

                <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
                    {categories.slice(0, 3).map((category, index) => (
                        <motion.div
                            key={category.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative h-[600px] w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md overflow-hidden bg-black/5 border border-black/5"
                        >
                            {category.image && (
                                <img loading="lazy"
                                    src={category.image}
                                    alt={category.name}
                                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-60 group-hover:opacity-100"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-10 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 z-20">
                                <span className="text-primary font-black text-[10px] uppercase tracking-[0.5em] mb-4">Inventory Archive 0{index + 1}</span>
                                <h3 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tighter text-foreground mb-6 italic">
                                    {category.name}
                                </h3>
                                <div className="h-px w-full bg-black/10 group-hover:bg-primary transition-colors duration-500 mb-6" />
                                <Link
                                    to={`/shop?category=${category.slug}`}
                                    className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-foreground hover:text-primary transition-colors"
                                >
                                    ACCESS CATALOGUE <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
