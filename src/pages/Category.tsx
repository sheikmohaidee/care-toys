import { useParams, Link, Navigate } from "react-router-dom";
import { categories } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function Category() {
    const { slug } = useParams<{ slug: string }>();
    const category = categories.find((c) => c.slug === slug);

    if (!category) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="min-h-screen bg-background pt-24">
            <div className="container px-4 mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Garage
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-4">
                        {category.name} <span className="text-primary">Collections</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        {category.description}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
                    {category.subcategories?.map((sub, index) => (
                        <motion.div
                            key={sub.slug}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                to={`/shop?category=${slug}&subcategory=${sub.slug}`}
                                className="group relative block aspect-[4/3] overflow-hidden rounded-xl border border-white/5 bg-secondary"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

                                {/* Placeholder for subcategory image */}
                                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500" />

                                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                                    <h3 className="text-2xl font-heading font-bold text-white uppercase italic mb-2">
                                        {sub.name}
                                    </h3>
                                    <p className="text-sm text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {sub.description}
                                    </p>
                                    <span className="inline-flex items-center text-primary font-bold uppercase tracking-wider text-xs">
                                        View Products <ArrowUpRight className="ml-2 h-3 w-3" />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
