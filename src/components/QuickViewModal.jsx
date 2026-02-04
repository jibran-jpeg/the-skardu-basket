import React from 'react';
import { X, ShoppingBag, Leaf, Check } from 'lucide-react';
import { storeConfig } from '../store.config';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export function QuickViewModal({ product, onClose }) {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-[#1F2833] w-full max-w-4xl rounded-[32px] overflow-hidden shadow-2xl animate-fade-in-up flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px]">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-brand-accent rounded-full backdrop-blur-md transition-colors"
                >
                    <X size={20} className="text-gray-800 dark:text-white" />
                </button>

                {/* Left: Image */}
                <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    {product.badge && (
                        <div className="absolute top-6 left-6">
                            <span className="bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                {product.badge}
                            </span>
                        </div>
                    )}
                </div>

                {/* Right: Details */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto custom-scrollbar">
                    <div className="mb-1">
                        <span className="text-brand-accent text-xs font-bold uppercase tracking-widest">
                            Official Global Store
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary dark:text-white mb-4">
                        {product.name}
                    </h2>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {storeConfig.currency} {product.price}
                        </span>
                        {product.stock && (
                            <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg">
                                <Check size={14} /> In Stock
                            </span>
                        )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        {product.longDescription || product.description}
                    </p>

                    {product.features && (
                        <div className="mb-8">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Key Benefits</h4>
                            <ul className="grid grid-cols-1 gap-2">
                                {product.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Leaf size={14} className="text-brand-accent" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-auto flex flex-col gap-3">
                        <button
                            onClick={() => {
                                addToCart(product);
                                onClose();
                            }}
                            className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            <ShoppingBag size={18} />
                            Add to Basket
                        </button>
                        <button
                            onClick={() => {
                                onClose();
                                navigate(`/product/${product.id}`);
                            }}
                            className="w-full bg-transparent border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                            View Full Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
