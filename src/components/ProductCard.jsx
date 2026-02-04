import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Calendar, Sprout, Clock } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { getImageUrl } from '../utils/imageHelper';

export function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);

    // Helper function to get seasonal status badge
    const getSeasonalBadge = () => {
        if (!product.seasonalStatus) return null;

        const badges = {
            'harvesting-now': {
                text: 'Harvesting Now',
                icon: Sprout,
                bgColor: 'bg-emerald-500',
                textColor: 'text-white',
                pulseColor: 'bg-emerald-400'
            },
            'starting-soon': {
                text: 'Starting Soon',
                icon: Calendar,
                bgColor: 'bg-blue-500',
                textColor: 'text-white',
                pulseColor: 'bg-blue-400'
            },
            'ending-soon': {
                text: 'Ending Soon',
                icon: Clock,
                bgColor: 'bg-amber-500',
                textColor: 'text-white',
                pulseColor: 'bg-amber-400'
            }
        };

        const badge = badges[product.seasonalStatus];
        if (!badge) return null;

        const Icon = badge.icon;

        return (
            <div className="absolute top-3 left-3 z-10">
                <div className={`${badge.bgColor} ${badge.textColor} px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider animate-fade-in`}>
                    <div className="relative flex items-center">
                        <Icon size={14} className="relative z-10" />
                        {product.seasonalStatus === 'harvesting-now' && (
                            <span className={`absolute inset-0 ${badge.pulseColor} rounded-full animate-ping opacity-75`}></span>
                        )}
                    </div>
                    <span>{badge.text}</span>
                </div>
                {product.harvestMonths && (
                    <div className="mt-1.5 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-medium flex items-center gap-1">
                        <Calendar size={10} />
                        {product.harvestMonths}
                    </div>
                )}
            </div>
        );
    };

    // Determine if product is available for purchase
    const isAvailable = product.seasonalStatus !== 'starting-soon' && product.stock > 0;
    const isLowStock = product.stock > 0 && product.stock <= 5;
    const isOutOfStock = product.stock === 0;

    return (
        <Link
            to={`/product/${product.id}`}
            className="group block animate-fade-in-up"
        >
            <div className="bg-white dark:bg-[#1F2833] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-white/5 hover:border-brand-primary/20 dark:hover:border-brand-primary/30 transform hover:-translate-y-2">

                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[4/5]">
                    <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!isAvailable ? 'grayscale-[0.3]' : ''}`}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Seasonal Status Badge */}
                    {getSeasonalBadge()}

                    {/* New Badge (if no seasonal status) */}
                    {product.isNew && !product.seasonalStatus && (
                        <div className="absolute top-3 left-3 z-10">
                            <span className="px-3 py-1 bg-brand-primary text-white text-xs font-bold rounded-full shadow-lg uppercase tracking-wider">
                                New Harvest
                            </span>
                        </div>
                    )}

                    {/* Discount Badge */}
                    {product.discount && (
                        <div className="absolute top-3 right-3 z-10">
                            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                                -{product.discount}%
                            </span>
                        </div>
                    )}

                    {/* Low Stock Badge */}
                    {isLowStock && !product.seasonalStatus && (
                        <div className="absolute top-3 right-3 z-10">
                            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                                Only {product.stock} left!
                            </span>
                        </div>
                    )}

                    {/* Quick Add Button - Only show if available */}
                    {isAvailable && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (product.stock > 0) {
                                    addToCart(product);
                                }
                            }}
                            className="absolute bottom-4 right-4 w-12 h-12 bg-white dark:bg-[#1F2833] rounded-full flex items-center justify-center text-brand-primary shadow-xl translate-y-16 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-primary hover:text-white border-2 border-brand-primary/20 hover:border-brand-primary z-10"
                        >
                            <ShoppingCart size={20} />
                        </button>
                    )}

                    {/* Coming Soon / Out of Stock Overlay */}
                    {!isAvailable && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 transition-all duration-300">
                            <div className="text-center px-4">
                                {isOutOfStock ? (
                                    <>
                                        <ShoppingCart size={32} className="text-white mx-auto mb-2 opacity-90" />
                                        <p className="text-white font-bold text-sm tracking-wide">Out of Stock</p>
                                    </>
                                ) : (
                                    <>
                                        <Calendar size={32} className="text-white mx-auto mb-2 opacity-90" />
                                        <p className="text-white font-bold text-sm tracking-wide">Harvesting Soon</p>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                    <h3 className="font-serif font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({product.reviews})
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-2xl font-bold text-brand-primary dark:text-brand-accent">
                                PKR {product.price}
                            </span>
                            {product.variants && product.variants.length > 1 && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                    from
                                </span>
                            )}
                        </div>

                        {product.badge && (
                            <span className="text-xs font-bold text-brand-primary dark:text-brand-accent bg-brand-primary/10 dark:bg-brand-accent/10 px-2 py-1 rounded-full">
                                {product.badge}
                            </span>
                        )}
                    </div>

                    {/* Variants Indicator */}
                    {product.variants && product.variants.length > 1 && (
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                                {product.variants.length} sizes available
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
