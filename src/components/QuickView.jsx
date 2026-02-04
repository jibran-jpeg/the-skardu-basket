import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { storeConfig } from '../store.config';

export function QuickView({ product, onClose }) {
    const { addToCart } = useCart();
    const { addToast } = useToast();
    const [isAdding, setIsAdding] = useState(false);
    const [closing, setClosing] = useState(false);

    // Animation handling
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleClose = () => {
        setClosing(true);
        setTimeout(onClose, 300);
    };

    const handleAddToCart = () => {
        addToCart(product);
        addToast(`Added ${product.name} to Basket`, 'success');
        setIsAdding(true);
        setTimeout(() => setIsAdding(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMounted && !closing ? 'opacity-100' : 'opacity-0'}`}
                onClick={handleClose}
            ></div>

            <div
                className={`
                    relative w-full max-w-4xl bg-white dark:bg-[#1A1D23] rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row
                    transition-all duration-500 transform
                    ${isMounted && !closing ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'}
                `}
            >
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-full bg-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        <X size={24} className="text-gray-500 dark:text-white" />
                    </button>
                </div>

                {/* Left: Image */}
                <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative bg-gray-100 dark:bg-black/20">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    {product.badge && (
                        <div className="absolute top-6 left-6">
                            <span className="bg-brand-primary text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                                {product.badge}
                            </span>
                        </div>
                    )}
                </div>

                {/* Right: Info */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-start justify-center text-left">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                        {product.name}
                    </h2>
                    <p className="text-2xl text-brand-primary dark:text-brand-accent font-bold mb-6">
                        {storeConfig.currency}{product.price}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex flex-col gap-4 w-full">
                        <button
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            className={`w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${isAdding
                                ? 'bg-green-600 text-white'
                                : 'bg-brand-primary text-white hover:bg-brand-primary/90'
                                }`}
                        >
                            {isAdding ? (
                                <>
                                    <Check className="w-5 h-5" />
                                    Added!
                                </>
                            ) : (
                                <>
                                    <ShoppingBag className="w-5 h-5" />
                                    Add to Basket
                                </>
                            )}
                        </button>

                        <Link
                            to={`/product/${product.id}`}
                            onClick={handleClose}
                            className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest border-2 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:border-brand-primary hover:text-brand-primary transition-all flex items-center justify-center gap-2"
                        >
                            View Full Details <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
