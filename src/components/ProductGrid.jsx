import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown, Leaf, X, SearchX } from 'lucide-react';
import { ProductCard } from './ProductCard';

export function ProductGrid({ selectedCategory, onCategoryChange, searchQuery }) {
    const { products, categories } = useProducts();
    const { addToCart } = useContext(CartContext);
    const activeCategory = selectedCategory;
    const [sortOption, setSortOption] = useState('default');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 10000000]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filter products by category and search query
    const filteredProducts = useMemo(() => {
        let result = products;

        if (activeCategory) {
            result = result.filter(product => product.categoryId === activeCategory);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            );
        }

        // Price Filter
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        return result;
    }, [activeCategory, searchQuery, priceRange, products]);

    // Sort filtered products
    const sortedProducts = useMemo(() => {
        const products = [...filteredProducts];
        if (sortOption === 'low-high') {
            return products.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'high-low') {
            return products.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'best-selling') {
            return products.sort((a, b) => (b.badge === 'Best Seller' ? 1 : 0) - (a.badge === 'Best Seller' ? 1 : 0));
        }
        return products;
    }, [filteredProducts, sortOption]);

    const getSortLabel = () => {
        switch (sortOption) {
            case 'low-high': return 'Price: Low to High';
            case 'high-low': return 'Price: High to Low';
            case 'best-selling': return 'Best Selling';
            default: return 'Sort By';
        }
    };

    return (
        <div className="pb-20">
            {/* Sticky Filter Bar */}
            <div className="sticky top-24 z-30 mx-4 md:mx-auto max-w-7xl mb-12 mt-[-20px]">
                <div className="glass-panel p-2 flex justify-between items-center shadow-xl shadow-brand-primary/5 border border-white/40 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-[#1F2833]/80 rounded-2xl">

                    <div className="flex items-center space-x-6">

                        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400 font-medium">
                            <button
                                onClick={() => onCategoryChange(null)}
                                className={`px-4 py-1.5 rounded-full transition-all text-xs font-bold uppercase tracking-wider ${!activeCategory ? 'bg-brand-primary text-white shadow-md' : 'hover:bg-gray-100 dark:hover:bg-white/10 hover:text-brand-primary'}`}
                            >
                                All
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => onCategoryChange(category.id)}
                                    className={`px-4 py-1.5 rounded-full transition-all text-xs font-bold uppercase tracking-wider ${activeCategory === category.id ? 'bg-brand-primary text-white shadow-md' : 'hover:bg-gray-100 dark:hover:bg-white/10 hover:text-brand-primary'}`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>

                    </div>
                    <div className="relative">

                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center space-x-2 text-brand-primary dark:text-[#F5F5F5] hover:text-brand-accent transition-colors uppercase text-xs font-bold tracking-widest mr-6"
                        >
                            <span>Price Range</span>
                            <ChevronDown size={14} className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isFilterOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                                <div className="absolute right-0 top-full mt-4 w-64 bg-white dark:bg-[#1F2833] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 p-6 z-50 animate-fade-in-up">
                                    <div className="flex gap-4 mb-4">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 mb-1 block">Min</label>
                                            <input
                                                type="number"
                                                value={priceRange[0]}
                                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 mb-1 block">Max</label>
                                            <input
                                                type="number"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-gray-400">
                                        <span>PKR 0 - 10,000,000+</span>
                                        <button
                                            onClick={() => setPriceRange([0, 10000000])}
                                            className="text-brand-accent hover:underline"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}


                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center space-x-2 text-brand-primary dark:text-[#F5F5F5] hover:text-brand-accent transition-colors uppercase text-xs font-bold tracking-widest"
                        >
                            <span>{getSortLabel()}</span>
                            <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Sort Dropdown */}
                        {isSortOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsSortOpen(false)}
                                />
                                <div className="absolute right-0 top-full mt-4 w-56 bg-white dark:bg-[#1F2833] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden z-50 animate-fade-in-up">
                                    <button
                                        onClick={() => {
                                            setSortOption('default');
                                            setIsSortOpen(false);
                                        }}
                                        className={`w-full px-6 py-4 text-left text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${sortOption === 'default' ? 'text-brand-primary dark:text-brand-accent font-bold' : 'text-gray-600 dark:text-gray-300'}`}
                                    >
                                        Default
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSortOption('low-high');
                                            setIsSortOpen(false);
                                        }}
                                        className={`w-full px-6 py-4 text-left text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${sortOption === 'low-high' ? 'text-brand-primary dark:text-brand-accent font-bold' : 'text-gray-600 dark:text-gray-300'}`}
                                    >
                                        Price: Low to High
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSortOption('high-low');
                                            setIsSortOpen(false);
                                        }}
                                        className={`w-full px-6 py-4 text-left text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${sortOption === 'high-low' ? 'text-brand-primary dark:text-brand-accent font-bold' : 'text-gray-600 dark:text-gray-300'}`}
                                    >
                                        Price: High to Low
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSortOption('best-selling');
                                            setIsSortOpen(false);
                                        }}
                                        className={`w-full px-6 py-4 text-left text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${sortOption === 'best-selling' ? 'text-brand-primary dark:text-brand-accent font-bold' : 'text-gray-600 dark:text-gray-300'}`}
                                    >
                                        Best Selling
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </div>

            {/* Active Filter Badge for Mobile */}
            <div className="md:hidden max-w-7xl mx-auto px-4 mb-8">
                <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar mask-gradient-right -mx-4 px-4 after:content-[''] after:w-4 after:shrink-0">
                    <button
                        onClick={() => onCategoryChange(null)}
                        className={`whitespace-nowrap px-5 py-2.5 rounded-full transition-all text-xs font-bold uppercase tracking-wider border shadow-sm ${!activeCategory ? 'bg-brand-primary border-brand-primary text-white shadow-brand-primary/20' : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10'}`}
                    >
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`whitespace-nowrap px-5 py-2.5 rounded-full transition-all text-xs font-bold uppercase tracking-wider border shadow-sm ${activeCategory === category.id ? 'bg-brand-primary border-brand-primary text-white shadow-brand-primary/20' : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10'}`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {sortedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {sortedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-400 dark:text-gray-500">
                            <SearchX size={32} />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-brand-primary dark:text-[#F5F5F5] mb-2">
                            No treasures found
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8">
                            We couldn't find any products matching your current filters. Try adjusting your search or price range.
                        </p>
                        <button
                            onClick={() => {
                                onCategoryChange(null);
                                setPriceRange([0, 10000]);
                                setSortOption('default');
                            }}
                            className="bg-brand-primary text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-brand-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
