"use client";

import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { useProducts } from "@/context/ProductContext";
import { useMemo } from "react";

export default function EditProductPage() {
    const { id } = useParams();
    const router = useRouter();
    const { getProduct, updateProduct } = useProducts();

    const product = useMemo(() => getProduct(id as string), [id, getProduct]);

    const handleSubmit = (data: any) => {
        updateProduct(data);
        router.push("/admin/products");
    };

    if (!product) {
        return (
            <div className="p-20 text-center">
                <h1 className="text-white font-black uppercase italic text-4xl">Engine Not Found</h1>
            </div>
        );
    }

    return (
        <ProductForm
            title="Update Configuration"
            initialData={product}
            onSubmit={handleSubmit}
        />
    );
}
