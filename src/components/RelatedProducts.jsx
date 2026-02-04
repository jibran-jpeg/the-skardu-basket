import React, { useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { useProducts } from '../context/ProductContext';

export function RelatedProducts({ currentProduct }) {
    const { products } = useProducts();

    const relatedProducts = useMemo(() => {
        if (!currentProduct || !products.length) return [];

        // Filter products from the same category, excluding the current one
        const related = products
            .filter(p => p.categoryId === currentProduct.categoryId && p.id !== currentProduct.id)
            .slice(0, 4); // Limit to 4 related products

        // If not enough products in same category, fill with popular items
        if (related.length < 4) {
            const others = products
                .filter(p => p.categoryId !== currentProduct.categoryId && p.id !== currentProduct.id && !related.find(r => r.id === p.id))
                .slice(0, 4 - related.length);
            return [...related, ...others];
        }

        return related;
    }, [currentProduct, products]);

    if (relatedProducts.length === 0) return null;

    return (
        <section className="py-16 border-t border-gray-100 dark:border-white/10">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-[#F5F5F5] mb-4">
                    You May Also Like
                </h2>
                <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full opacity-60"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                    <div key={product.id} className="h-full">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
}
