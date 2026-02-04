import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storeConfig } from '../store.config';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useProducts } from '../context/ProductContext';
import { RelatedProducts } from '../components/RelatedProducts';
import { StickyCart } from '../components/StickyCart';
import { SEO } from '../components/SEO';
import { ProductReviews } from '../components/ProductReviews';
import { ArrowLeft, Shield, Truck, Mountain, Sun, Sprout, ShoppingBag, Check, Calendar } from 'lucide-react';

export function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const { products, loading: contextLoading } = useProducts();

    // Find product from live data instead of static config
    const product = products.find(p => String(p.id) === id);

    // State for selected variant (can be a full object or just a weight string for legacy)
    const [selectedVariant, setSelectedVariant] = useState(null);
    // State for currently displayed image (independent of selected variant initially)
    const [currentImage, setCurrentImage] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    // Initialize state when product loads
    useEffect(() => {
        if (product) {
            // Set initial image to product default
            setCurrentImage(product.image);

            if (product.variants && product.variants.length > 0) {
                // Select first variant properties by default (for price/weight)
                setSelectedVariant(product.variants[0]);
            } else if (product.weights && product.weights.length > 0) {
                // Legacy: Select first weight string
                setSelectedVariant(product.weights[0]);
            }
        }
    }, [product]);

    if (contextLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F5F4ED] to-[#ECEBE4] dark:from-[#1A1D23] dark:to-[#0B0C10]">
                <div className="w-12 h-12 border-4 border-brand-primary/10 border-t-brand-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#F5F4ED] to-[#ECEBE4] dark:from-[#1A1D23] dark:to-[#0B0C10]">
                <h2 className="text-3xl font-serif text-brand-primary dark:text-[#F5F5F5] mb-4">Product Unavailable</h2>
                <p className="text-gray-500 mb-6 font-sans">We couldn't find the product you're looking for.</p>
                <button onClick={() => navigate('/products')} className="px-8 py-3 bg-brand-primary text-white rounded-full font-bold uppercase tracking-wider text-xs hover:bg-brand-primary/90 transition-all shadow-lg">
                    Return to Collection
                </button>
            </div>
        );
    }

    const isRichVariant = product.variants && product.variants.length > 0;

    // Determine price and label based on selection
    const currentPrice = isRichVariant && selectedVariant ? selectedVariant.price : product.price;
    const currentWeightLabel = isRichVariant && selectedVariant ? selectedVariant.weight : selectedVariant;

    // Build unique images list for gallery
    const galleryImages = [product.image];
    if (isRichVariant) {
        product.variants.forEach(v => {
            if (v.image && !galleryImages.includes(v.image)) {
                galleryImages.push(v.image);
            }
        });
    }

    const handleAddToCart = () => {
        addToCart({
            ...product,
            price: currentPrice,
            image: (isRichVariant && selectedVariant) ? selectedVariant.image : product.image,
            selectedVariant: currentWeightLabel,
            name: currentWeightLabel ? `${product.name} (${currentWeightLabel})` : product.name
        });

        showToast(`Added ${product.name} to Basket`, 'success');
        setIsAdding(true);
        setTimeout(() => setIsAdding(false), 2000);
    };

    const handleVariantSelect = (variant) => {
        setSelectedVariant(variant);
        // Also update the main image to match the variant
        if (variant.image) {
            setCurrentImage(variant.image);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F5F4ED] to-[#ECEBE4] dark:from-[#1A1D23] dark:to-[#0B0C10] pt-32 pb-20 animate-fade-in relative">
            <SEO
                title={product.name}
                description={product.shortDescription || product.description}
                image={product.image}
                url={`/product/${product.id}`}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent mb-10 transition-colors uppercase tracking-widest text-xs font-bold group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Collection
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-start">
                    {/* Image Section */}
                    <div className="lg:sticky lg:top-32 relative">
                        <div className="relative aspect-square rounded-[30px] overflow-hidden shadow-2xl group mb-6">
                            <img
                                key={currentImage || 'default'}
                                src={currentImage || product.image}
                                alt={product.name}
                                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110 animate-fade-in"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                            {product.badge && (
                                <div className="absolute top-6 left-6">
                                    <span className="bg-brand-primary text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                                        {product.badge}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery (Only if multiple images exist) */}
                        {galleryImages.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {galleryImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImage(img)}
                                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${currentImage === img
                                            ? 'border-brand-primary ring-2 ring-brand-primary/20'
                                            : 'border-transparent opacity-70 hover:opacity-100 hover:border-gray-300'
                                            }`}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center lg:pt-8 text-left">
                        <div className="mb-2">
                            <div className="flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-[0.2em] mb-3">
                                <Sprout size={14} />
                                <span>Organic Harvest</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif text-brand-primary dark:text-[#F5F5F5] tracking-tight leading-tight mb-4">
                                {product.name}
                            </h1>
                            <div className="flex items-end gap-3 mb-8">
                                <p className="text-3xl text-brand-primary dark:text-white font-sans font-bold">
                                    {storeConfig.currency}{currentPrice}
                                </p>
                                <span className={`text-sm mb-1.5 font-medium flex items-center gap-1 ${product.seasonalStatus === 'starting-soon' ? 'text-amber-500' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {product.seasonalStatus === 'starting-soon' ? (
                                        <>
                                            <Calendar className="w-4 h-4" />
                                            Harvest Starting Soon
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4 text-green-500" />
                                            In Stock
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Quantity / Weight Selector */}
                        {(isRichVariant || (product.weights && product.weights.length > 0)) && (
                            <div className="mb-8">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-3">
                                    Select Quantity
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {isRichVariant ? (
                                        // Render from variants array
                                        product.variants.map((variant) => (
                                            <button
                                                key={variant.weight}
                                                onClick={() => handleVariantSelect(variant)}
                                                className={`px-6 py-3 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${selectedVariant?.weight === variant.weight
                                                    ? 'border-brand-primary bg-brand-primary text-white shadow-lg shadow-brand-primary/20 transform -translate-y-1'
                                                    : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-brand-primary/50 dark:hover:border-white/30'
                                                    }`}
                                            >
                                                {variant.weight}
                                            </button>
                                        ))
                                    ) : (
                                        // Render from legacy weights array
                                        product.weights.map((weight) => (
                                            <button
                                                key={weight}
                                                onClick={() => setSelectedVariant(weight)}
                                                className={`px-6 py-3 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${selectedVariant === weight
                                                    ? 'border-brand-primary bg-brand-primary text-white shadow-lg shadow-brand-primary/20 transform -translate-y-1'
                                                    : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-brand-primary/50 dark:hover:border-white/30'
                                                    }`}
                                            >
                                                {weight}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Add to Cart Button - Moved Up */}
                        <div className="mb-8">
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding || product.seasonalStatus === 'starting-soon'}
                                className={`w-full py-5 rounded-[20px] text-lg font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg flex items-center justify-center gap-3 group ${isAdding
                                    ? 'bg-green-600 text-white shadow-green-500/20 translate-y-1'
                                    : product.seasonalStatus === 'starting-soon'
                                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                        : 'bg-brand-primary text-white hover:bg-brand-primary/90 hover:shadow-xl hover:shadow-brand-primary/20 hover:-translate-y-1'
                                    }`}
                            >
                                {product.seasonalStatus === 'starting-soon' ? (
                                    <>
                                        <Calendar className="w-5 h-5" />
                                        Harvest Starting Soon
                                    </>
                                ) : isAdding ? (
                                    <>
                                        <Check className="w-6 h-6 animate-bounce" />
                                        Added to Basket!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Add to Basket
                                        {currentWeightLabel && <span className="opacity-60 text-sm normal-case font-medium">({currentWeightLabel})</span>}
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Fresh Product Warning - Moved Below Button */}
                        {product.categoryId === 'seasonal-fruits' && (
                            <div className="mb-8 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-amber-100 dark:bg-amber-800/40 rounded-full text-amber-700 dark:text-amber-400">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-amber-900 dark:text-amber-100 text-sm mb-1">
                                            Cash on Delivery Unavailable
                                        </h4>
                                        <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
                                            Advance payment required for fresh fruits to ensure timely delivery.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="h-px w-full bg-gradient-to-r from-brand-primary/10 to-transparent dark:from-white/10 mb-8"></div>

                        {/* Product Description */}
                        <div className="mb-10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-brand-primary dark:text-brand-accent mb-4">Product Details</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                                {product.longDescription || product.description}
                            </p>
                        </div>

                        {/* Harvesting Process */}
                        {product.harvestProcess && (
                            <div className="mb-8 p-6 bg-white dark:bg-[#1F2833] rounded-[24px] shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Mountain size={100} className="text-brand-primary dark:text-white" />
                                </div>
                                <div className="relative z-10 flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                                        <Sun size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white mb-2">
                                            How we Harvest
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-light">
                                            {product.harvestProcess}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {product.features && (
                            <div className="mb-10">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-brand-primary dark:text-brand-accent mb-4">Highlights</h3>
                                <ul className="space-y-3">
                                    {product.features.map((feature) => (
                                        <li key={feature} className="flex items-center text-gray-700 dark:text-gray-300 font-light">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary dark:bg-brand-accent mr-4" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}





                        <div className="mt-8 flex items-center justify-center gap-8 py-6 border-t border-gray-100 dark:border-white/10">
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                                <Shield className="w-4 h-4 mr-2 text-brand-accent" />
                                <span>Quality Guarantee</span>
                            </div>
                            <div className="w-px h-4 bg-gray-200 dark:bg-white/10"></div>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                                <Truck className="w-4 h-4 mr-2 text-brand-accent" />
                                <span>Secure Shipping</span>
                            </div>
                        </div>
                    </div>
                </div>

                <ProductReviews productId={product.id} className="mb-20 py-20 border-t border-gray-100 dark:border-white/5" />
                <RelatedProducts currentProduct={product} />
                <StickyCart product={product} />
            </div>
        </div>
    );
}
