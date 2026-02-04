import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../components/ProductGrid';

export function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('category');

    const handleCategoryChange = (category) => {
        const newParams = new URLSearchParams(searchParams);
        if (category) {
            newParams.set('category', category);
        } else {
            newParams.delete('category');
        }
        setSearchParams(newParams);
    };

    return (
        <div className="pt-32 pb-20 relative overflow-hidden min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 animate-fade-in-down">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/5 dark:bg-white/5 border border-brand-primary/10 dark:border-white/10 text-brand-primary dark:text-brand-accent text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
                        Pure & Organic Collection
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold font-serif text-brand-primary dark:text-[#F5F5F5] mb-6 tracking-tight relative inline-block">
                        <span className="relative z-10">Our Products</span>
                        <div className="absolute -bottom-2 left-0 right-0 h-3 bg-brand-accent/20 -rotate-1 rounded-full -z-10 blur-sm"></div>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
                        Explore our hand-picked selection of nature's finest treasures, sourced directly from the pristine valleys of Skardu.
                    </p>
                </div>

                <ProductGrid
                    selectedCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                    searchQuery={searchParams.get('search')}
                />
            </div>
        </div>
    );
}
