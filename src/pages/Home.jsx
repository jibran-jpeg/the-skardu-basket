import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { FeaturesStrip } from '../components/FeaturesStrip';
import { CompanyInfo } from '../components/CompanyInfo';
import { CategoryCard } from '../components/CategoryCard';
import { StorySection } from '../components/StorySection';
import { BestSeller } from '../components/BestSeller';
import { Reviews } from '../components/Reviews';
import { ChevronLeft, ChevronRight, Leaf } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export function Home() {
    const { products, categories, loading } = useProducts();
    const [activeCategory, setActiveCategory] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const categoryCardsRef = useRef([]);
    const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

    // All hooks MUST be called before any conditional returns
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveCategory(Number(entry.target.dataset.index));
                        }
                    });
                },
                { threshold: 0.6 }
            );

            categoryCardsRef.current.forEach((card) => {
                if (card) observer.observe(card);
            });

            return () => {
                categoryCardsRef.current.forEach((card) => {
                    if (card) observer.unobserve(card);
                });
            };
        }
    }, [isMobile]);

    const seasonalFruits = !loading ? products.filter(p => p.categoryId === 'seasonal-fruits' && p.seasonalStatus !== 'starting-soon') : [];

    useEffect(() => {
        if (seasonalFruits.length > 0) {
            const timer = setInterval(() => {
                setCurrentFeatureIndex((prev) => (prev + 1) % seasonalFruits.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [seasonalFruits.length]);

    // Loading state - AFTER all hooks
    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-accent"></div>
            </div>
        );
    }

    // Safety check for empty seasonalFruits
    const currentProduct = seasonalFruits.length > 0 ? seasonalFruits[currentFeatureIndex] : {};

    const nextFeature = () => {
        setCurrentFeatureIndex((prev) => (prev + 1) % seasonalFruits.length);
    };

    const prevFeature = () => {
        setCurrentFeatureIndex((prev) => (prev - 1 + seasonalFruits.length) % seasonalFruits.length);
    };

    return (
        <>
            <SEO
                title="Home"
                description="Discover the purest organic treasures from Skardu's valleys. Premium dry fruits, gems, and shilajit."
            />
            <Hero />
            <AnnouncementBar />
            <FeaturesStrip />

            <section className="py-12 md:py-24 relative overflow-hidden">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-12 md:mb-20">
                        <div className="inline-block mb-3 md:mb-4">
                            <div className="flex items-center gap-2 md:gap-3 mb-2">
                                <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-brand-accent"></div>
                                <span className="text-xs md:text-sm font-semibold text-brand-accent uppercase tracking-wider">Explore</span>
                                <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-brand-accent"></div>
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-brand-primary dark:text-[#F5F5F5] mb-3 md:mb-4 tracking-tight">
                            Our Collections
                        </h2>
                        <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-brand-accent/50 via-brand-accent to-brand-accent/50 mx-auto mb-4 md:mb-6 rounded-full"></div>
                        <p className="text-base md:text-lg text-gray-600 dark:text-[#C5C6C7] max-w-3xl mx-auto leading-relaxed">
                            Discover our carefully curated selection of premium products, each category representing the finest quality from Skardu.
                        </p>
                    </div>

                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pt-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
                        {categories.map((category, index) => (
                            <div
                                key={category.id}
                                ref={el => categoryCardsRef.current[index] = el}
                                data-index={index}
                                className="min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <CategoryCard category={category} isActive={isMobile && activeCategory === index} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Harvesting Now: Feature Carousel */}
            <section id="harvesting-now" className="py-12 md:py-20 bg-brand-primary dark:bg-brand-primary/20 relative overflow-hidden text-white transition-colors duration-500">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header for Harvesting Now */}
                    <div className="text-center mb-10 md:mb-16">
                        <div className="inline-block mb-3 md:mb-4">
                            <div className="flex items-center gap-2 md:gap-3 mb-2 justify-center">
                                <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-brand-accent"></div>
                                <span className="text-xs md:text-sm font-semibold text-brand-accent/80 uppercase tracking-wider">Fresh From Skardu</span>
                                <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-brand-accent"></div>
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white mb-3 md:mb-4 tracking-tight">
                            Harvesting Now
                        </h2>
                        <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-brand-accent/50 via-brand-accent to-brand-accent/50 mx-auto mb-4 md:mb-6 rounded-full"></div>
                    </div>

                    {/* Mobile View: Horizontal Scroll List */}
                    <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 scrollbar-hide">
                        {seasonalFruits.map((product) => (
                            <div key={`mobile-seasonal-${product.id}`} className="min-w-[90vw] snap-center">
                                {/* Premium Feature Card */}
                                <div className="relative h-[450px] rounded-[32px] overflow-hidden shadow-2xl mx-1 my-2 group">
                                    {/* Full Background Image */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Gradient Overlays */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                        <div className="absolute inset-0 bg-brand-primary/20 mix-blend-overlay"></div>
                                    </div>

                                    {/* Badge */}
                                    <div className="absolute top-6 left-6 z-10">
                                        <span className="bg-white/95 backdrop-blur-md text-brand-primary font-bold px-4 py-2 rounded-full text-xs uppercase tracking-widest shadow-lg border border-brand-primary/10 flex items-center gap-2">
                                            <Leaf size={12} className="text-brand-accent" />
                                            Harvesting Now
                                        </span>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                                        <div className="transform translate-y-2 transition-transform duration-500">
                                            {/* Season Urgency Tag */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {product.seasonalStatus === 'ending-soon' && (
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFD700] bg-black/60 px-2 py-1 rounded border border-[#FFD700]/30 animate-pulse">
                                                        Season Ending Soon
                                                    </span>
                                                )}
                                                {product.seasonalStatus === 'harvesting-now' && (
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-black/60 px-2 py-1 rounded border border-emerald-400/30">
                                                        Harvesting Now
                                                    </span>
                                                )}
                                                {product.seasonalStatus === 'starting-soon' && (
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-black/60 px-2 py-1 rounded border border-blue-400/30">
                                                        Starts Soon
                                                    </span>
                                                )}
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-white/20 px-2 py-1 rounded">
                                                    Premium 100% Organic
                                                </span>
                                            </div>

                                            <h3 className="text-3xl font-serif font-bold text-white mb-2 leading-tight drop-shadow-md text-shadow-sm">
                                                {product.name}
                                            </h3>

                                            <p className="text-white/90 text-xs font-medium italic mb-3 opacity-90">
                                                "Peak harvest delicacy. Delivered fresh from Skardu."
                                            </p>

                                            <p className="text-gray-300 text-sm mb-6 line-clamp-2 leading-relaxed">
                                                {product.description}
                                            </p>

                                            <div className="flex items-center justify-between gap-4">
                                                <div>
                                                    <p className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-0.5">Price</p>
                                                    <p className="text-xl font-bold text-white">PKR {product.price}</p>
                                                </div>
                                                <Link
                                                    to={`/product/${product.id}`}
                                                    className="bg-white text-brand-primary px-6 py-3 rounded-full font-bold text-sm hover:bg-brand-accent transition-colors shadow-lg active:scale-95 flex items-center gap-2"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View: Featured Carousel */}
                    <div className="hidden md:block">
                        {/* Navigation Buttons - Fixed Position */}
                        <button
                            onClick={prevFeature}
                            className="absolute left-0 lg:-left-16 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-brand-accent/20 backdrop-blur-md p-3 md:p-4 rounded-full text-white transition-all transform hover:scale-110 active:scale-95 border border-white/10 shadow-lg group"
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={nextFeature}
                            className="absolute right-0 lg:-right-16 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-brand-accent/20 backdrop-blur-md p-3 md:p-4 rounded-full text-white transition-all transform hover:scale-110 active:scale-95 border border-white/10 shadow-lg group"
                            aria-label="Next Slide"
                        >
                            <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="flex flex-col md:flex-row items-center gap-12 transition-all duration-700 ease-in-out" key={currentProduct.id}>
                            <div className="w-full md:w-1/2 animate-fade-in-left">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-brand-accent rounded-[40px] rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                                    <img
                                        src={currentProduct.image}
                                        alt={currentProduct.name}
                                        className="relative rounded-[40px] shadow-2xl border-4 border-white/20 w-full object-cover aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500"
                                    />
                                    {currentProduct.badge && (
                                        <div className="absolute top-6 left-6 bg-white text-brand-primary font-bold px-4 py-2 rounded-full shadow-lg uppercase tracking-wider text-xs z-20">
                                            {currentProduct.badge}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 text-center md:text-left animate-fade-in-right">

                                {/* Season Urgency Tag - Desktop */}
                                <div className="flex flex-wrap gap-3 mb-4 justify-center md:justify-start">
                                    {currentProduct.seasonalStatus === 'ending-soon' && (
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] bg-brand-accent/10 px-3 py-1.5 rounded border border-[#FFD700]/30 animate-pulse">
                                            Season Ending Soon
                                        </span>
                                    )}
                                    {currentProduct.seasonalStatus === 'harvesting-now' && (
                                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded border border-emerald-400/30">
                                            Harvesting Now
                                        </span>
                                    )}
                                    {currentProduct.seasonalStatus === 'starting-soon' && (
                                        <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded border border-blue-400/30">
                                            Starts Soon
                                        </span>
                                    )}
                                    <span className="text-xs font-bold uppercase tracking-widest text-white/90 bg-white/10 px-3 py-1.5 rounded">
                                        Premium 100% Organic
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-serif font-black mb-4 leading-tight">
                                    {currentProduct.name}
                                </h2>

                                <p className="text-brand-accent text-lg font-medium italic mb-6">
                                    "Peak harvest delicacy. Delivered fresh from Skardu."
                                </p>

                                <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl">
                                    {currentProduct.longDescription || currentProduct.description}
                                </p>

                                {/* Features Tags */}
                                {currentProduct.features && (
                                    <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">
                                        {currentProduct.features.map((feature, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                                <Leaf size={12} className="text-brand-accent" /> {feature}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                                    <Link
                                        to={`/product/${currentProduct.id}`}
                                        className="px-8 py-4 bg-brand-accent text-brand-primary font-bold rounded-full hover:bg-white transition-colors shadow-lg shadow-brand-accent/20 uppercase tracking-widest text-sm"
                                    >
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Dots Indicator */}
                        <div className="flex justify-center mt-8 gap-2">
                            {seasonalFruits.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentFeatureIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentFeatureIndex === idx
                                        ? 'bg-brand-accent w-6'
                                        : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <BestSeller />
            <StorySection />
            <Reviews />
            <div id="about-us">
                <CompanyInfo />
            </div>
        </>
    );
}
