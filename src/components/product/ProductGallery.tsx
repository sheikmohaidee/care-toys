"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    images?: string[];
}

export function ProductGallery({ images = [] }: ProductGalleryProps) {
    // Mock images if none provided
    const displayImages = images.length > 0 ? images : [
        "/images/placeholder-1.jpg",
        "/images/placeholder-2.jpg",
        "/images/placeholder-3.jpg",
        "/images/placeholder-4.jpg",
    ];

    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24 flex-shrink-0">
                {displayImages.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                            "relative w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden border-2 transition-all flex-shrink-0",
                            selectedImage === index ? "border-primary" : "border-transparent hover:border-white/20"
                        )}
                    >
                        <img loading="lazy"
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-grow aspect-square md:aspect-auto md:h-[600px] bg-secondary rounded-lg overflow-hidden relative group cursor-zoom-in">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full flex items-center justify-center bg-zinc-900"
                    >
                        <img loading="lazy"
                            src={displayImages[selectedImage]}
                            alt="Product View"
                            className="w-full h-full object-contain p-4"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* 3D Badge */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs font-bold uppercase border border-white/10">
                    3D View Available
                </div>
            </div>
        </div>
    );
}
