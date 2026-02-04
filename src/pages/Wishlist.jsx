import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';
import { storeConfig } from '../store.config';

export function Wishlist() {
    const { wishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { addToast } = useToast();

    // Mobile Wishlist Item Component
    const MobileWishlistItem = ({ product }) => (
        <div className="bg-white dark:bg-[#1F2833] p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex gap-4 mb-4 relative overflow-hidden group">
            {/* Image */}
            <Link to={`/product/${product.id}`} className="w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 dark:bg-black/20">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                />
            </Link>

            {/* Details */}
            <div className="flex flex-col flex-grow justify-between py-1">
                <div>
                    <div className="flex justify-between items-start gap-2">
                        <Link to={`/product/${product.id}`}>
                            <h3 className="text-base font-serif font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight mb-1">
                                {product.name}
                            </h3>
                        </Link>
                        <button
                            onClick={() => {
                                toggleWishlist(product);
                                addToast('Removed from Wishlist', 'info');
                            }}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-2 -mt-2"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                    <p className="text-sm font-bold text-brand-primary dark:text-brand-accent">
                        {storeConfig.currency}{product.price}
                    </p>
                </div>

                <div className="mt-2">
                    <button
                        onClick={() => {
                            addToCart(product);
                            addToast(`Added ${product.name} to Basket`, 'success');
                        }}
                        className="w-full bg-gray-900 dark:bg-gray-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md hover:bg-brand-primary"
                    >
                        <ShoppingBag size={14} />
                        Add to Basket
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-[#F5F5F5] mb-2">
                        My Wishlist
                    </h1>
                    <p className="text-gray-600 dark:text-[#C5C6C7]">
                        {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
                    </p>
                </div>

                <Link
                    to="/products"
                    className="mt-4 md:mt-0 inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent hover:underline font-bold"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                </Link>
            </div>

            {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                        <Heart className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-[#F5F5F5] mb-3">
                        Your wishlist is empty
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                        Looks like you haven't added any products to your wishlist yet.
                        Browse our collection and find something you love!
                    </p>
                    <Link
                        to="/products"
                        className="bg-brand-primary text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/20"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <>
                    {/* Mobile View (Horizontal Cards) */}
                    <div className="md:hidden flex flex-col">
                        {wishlist.filter(item => item && item.id).map((product) => (
                            <MobileWishlistItem key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Desktop View (Grid) */}
                    <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlist.filter(item => item && item.id).map((product) => (
                            <div key={product.id} className="h-full">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
