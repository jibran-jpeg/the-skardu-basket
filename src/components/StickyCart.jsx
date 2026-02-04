import React, { useState, useEffect } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { storeConfig } from '../store.config';

export function StickyCart({ product }) {
    const { addToCart } = useCart();
    const { addToast } = useToast();
    const [isAdding, setIsAdding] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAddToCart = () => {
        addToCart(product);
        addToast(`Added ${product.name} to Basket`, 'success');
        setIsAdding(true);
        setTimeout(() => setIsAdding(false), 2000);
    };

    if (!product) return null;

    return (
        <div
            className={`
                fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#1A1D23] border-t border-gray-100 dark:border-white/10 p-4 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]
                transition-transform duration-300 transform
                ${isVisible ? 'translate-y-0' : 'translate-y-full'}
            `}
        >
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                    <span className="text-xs text-brand-primary dark:text-gray-400 font-bold uppercase tracking-wider">{product.name}</span>
                    <span className="text-lg font-bold text-brand-primary dark:text-brand-accent">{storeConfig.currency}{product.price}</span>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`
                        flex-1 py-3 px-6 rounded-full font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg
                        ${isAdding
                            ? 'bg-green-600 text-white'
                            : 'bg-brand-primary text-white hover:bg-brand-primary/90'}
                    `}
                >
                    {isAdding ? (
                        <>
                            <Check size={18} />
                            Added
                        </>
                    ) : (
                        <>
                            <ShoppingBag size={18} />
                            Add to Basket
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
