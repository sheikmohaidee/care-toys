"use client";

import ProductForm from "@/components/admin/ProductForm";
import { useProducts } from "@/context/ProductContext";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
    const { addProduct } = useProducts();
    const router = useRouter();

    const handleSubmit = (data: any) => {
        addProduct(data);
        router.push("/admin/products");
    };

    return <ProductForm title="New Engine Blueprint" onSubmit={handleSubmit} />;
}
