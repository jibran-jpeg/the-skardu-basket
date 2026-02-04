import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Crown } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useProducts } from '../context/ProductContext';

export function BestSeller() {
    const { products, categories } = useProducts();

    // Get one best-selling representative from EACH category
    const allBestSellers = categories.map(category => {
        // 1. Try to find a product with "Best Seller" badge in this category
        const bestSeller = products.find(p => p.categoryId === category.id && p.badge === "Best Seller");

        // 2. If not found, take the first product from this category (fallback)
        if (bestSeller) return bestSeller;

        return products.find(p => p.categoryId === category.id);
    }).filter(Boolean); // Remote undefined if a category has no products

    return (
        <section className="py-24 bg-gradient-to-b from-white to-[#ECEBE4] dark:from-[#1A1D23] dark:to-[#0B0C10] relative overflow-hidden">
            {/* ... (background elements remain same) ... */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10">
                <div className="absolute top-10 left-10 w-96 h-96 bg-brand-primary dark:bg-brand-accent rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-brand-primary dark:bg-brand-accent rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ... (Header section remains same) ... */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-block mb-3 md:mb-4">
                        <div className="flex items-center gap-2 md:gap-3 mb-2">
                            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-brand-primary"></div>
                            <span className="text-xs md:text-sm font-semibold text-brand-primary dark:text-brand-accent uppercase tracking-wider">Featured Collection</span>
                            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-brand-primary"></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 md:gap-6 mb-3 md:mb-4">
                        <h2 className="text-4xl md:text-6xl font-bold font-serif text-brand-primary dark:text-[#F5F5F5] tracking-tight">
                            Curated Best Sellers
                        </h2>
                    </div>

                    <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-brand-primary/50 via-brand-primary to-brand-primary/50 dark:from-brand-accent/50 dark:via-brand-accent dark:to-brand-accent/50 mx-auto mb-4 md:mb-6 rounded-full"></div>

                    <p className="text-base md:text-lg text-gray-600 dark:text-[#C5C6C7] max-w-3xl mx-auto leading-relaxed mb-6">
                        The finest selection from each of our categories, chosen for their exceptional quality and customer love.
                    </p>

                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent font-sans text-sm tracking-widest hover:text-brand-accent dark:hover:text-white transition-colors uppercase font-semibold group"
                    >
                        Explore Full Collection
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Product Display - Luxury Grid */}
                <div className="relative">
                    {/* Mobile View: Horizontal Scroll */}
                    <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-12 -mx-4 px-4 scrollbar-hide">
                        {allBestSellers.map((product, index) => {
                            const categoryName = categories.find(c => c.id === product.categoryId)?.name;
                            return (
                                <div key={`mobile-${product.id}-${index}`} className="min-w-[75vw] snap-center">
                                    <div className="text-center mb-4">
                                        <p className="text-[10px] font-serif italic text-gray-500 dark:text-gray-400 mb-1">Our finest</p>
                                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary dark:text-[#F5F5F5]">
                                            {categoryName}
                                        </h4>
                                        <div className="w-8 h-px bg-brand-accent mx-auto mt-2"></div>
                                    </div>
                                    <ProductCard product={product} />
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop View: Elegant 4-Column Grid */}
                    <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {allBestSellers.map((product, index) => {
                            const categoryName = categories.find(c => c.id === product.categoryId)?.name;
                            return (
                                <div
                                    key={`${product.id}-${index}`}
                                    className="animate-fade-in-up flex flex-col h-full group"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Category Label with Luxury Hover Effect */}
                                    <div className="text-center mb-8 h-12 flex flex-col justify-end items-center">
                                        <span className="text-xs md:text-sm font-serif italic font-medium text-brand-accent mb-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out tracking-wide">
                                            The Pinnacle of
                                        </span>
                                        <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 group-hover:text-brand-primary dark:text-gray-500 dark:group-hover:text-white transition-colors duration-500">
                                            {categoryName}
                                        </h4>
                                        <div className="w-0 group-hover:w-16 h-px bg-brand-accent mt-3 transition-all duration-700 ease-out"></div>
                                    </div>

                                    <div className="flex-grow group-hover:-translate-y-2 transition-transform duration-700 ease-out">
                                        <ProductCard product={product} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom decorative divider */}
                <div className="mt-20 flex items-center justify-center gap-4">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent to-brand-primary/50 dark:to-brand-accent/50"></div>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 bg-brand-primary dark:bg-brand-accent rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-brand-primary/70 dark:bg-brand-accent/70 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-brand-primary/40 dark:bg-brand-accent/40 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <div className="h-px w-24 bg-gradient-to-l from-transparent to-brand-primary/50 dark:to-brand-accent/50"></div>
                </div>
            </div>
        </section>
    );
}
