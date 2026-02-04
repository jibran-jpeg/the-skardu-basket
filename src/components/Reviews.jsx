import React, { useState, useEffect } from 'react';
import { Star, User, Quote, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export function Reviews() {
    const { getFeaturedReviews } = useProducts();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [isPaused, setIsPaused] = useState(false);

    // Load featured reviews
    useEffect(() => {
        loadFeaturedReviews();
    }, []);

    const loadFeaturedReviews = async () => {
        setLoading(true);
        const featuredReviews = await getFeaturedReviews();
        setReviews(featuredReviews);
        setLoading(false);
    };

    // Responsive items per page - Always 1 as per user request
    useEffect(() => {
        setItemsPerPage(1);
    }, []);

    // Auto-slide
    useEffect(() => {
        if (isPaused || reviews.length === 0) return;
        const timer = setInterval(() => {
            nextSlide();
        }, 5000); // 5 seconds interval
        return () => clearInterval(timer);
    }, [currentIndex, itemsPerPage, isPaused, reviews.length]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const visibleReviews = [];
    for (let i = 0; i < itemsPerPage && reviews.length > 0; i++) {
        const index = (currentIndex + i) % reviews.length;
        visibleReviews.push(reviews[index]);
    }

    // Loading state
    if (loading) {
        return (
            <section className="py-20 bg-white dark:bg-[#1A1D23] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 size={40} className="text-brand-primary dark:text-brand-accent animate-spin mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">Loading customer reviews...</p>
                    </div>
                </div>
            </section>
        );
    }

    // Empty state
    if (reviews.length === 0) {
        return (
            <section className="py-20 bg-white dark:bg-[#1A1D23] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary dark:text-[#F5F5F5] mb-4">
                            What Our Customers Say
                        </h2>
                        <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full mb-6"></div>
                        <p className="text-gray-600 dark:text-[#C5C6C7] max-w-2xl mx-auto">
                            Real feedback from our valued customers who have experienced the taste of the mountains.
                        </p>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">
                            No featured reviews yet. Check back soon!
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-white dark:bg-[#1A1D23] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary dark:text-[#F5F5F5] mb-4">
                        What Our Customers Say
                    </h2>
                    <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-600 dark:text-[#C5C6C7] max-w-2xl mx-auto">
                        Real feedback from our valued customers who have experienced the taste of the mountains.
                    </p>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    {/* Reviews Grid */}
                    <div className="max-w-3xl mx-auto transition-all duration-500 ease-in-out">
                        {visibleReviews.map((review, idx) => (
                            <div
                                key={`${review.id}-${idx}`}
                                className="h-[350px] group flex flex-col justify-between p-8 border-2 border-gray-200 dark:border-[#2C3E50] rounded-2xl hover:border-brand-accent dark:hover:border-brand-accent transition-all duration-500 bg-white dark:bg-[#1F2833]/40 backdrop-blur-sm hover:shadow-2xl hover:shadow-brand-accent/20 hover:-translate-y-2 relative overflow-hidden animate-fade-in"
                            >
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                                {/* Decorative Quote Icon */}
                                <Quote className="absolute top-6 right-6 w-10 h-10 text-brand-accent/20 group-hover:text-brand-accent/40 group-hover:rotate-12 transition-all duration-500" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < review.rating ? 'text-brand-accent fill-brand-accent' : 'text-gray-300 dark:text-gray-600'}`}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed line-clamp-4 font-medium text-lg">
                                        "{review.comment}"
                                    </p>
                                </div>

                                <div className="relative z-10 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-brand-accent/10 to-brand-accent/5 dark:from-brand-accent/20 dark:to-brand-accent/10 rounded-full flex items-center justify-center border border-brand-accent/20 group-hover:scale-110 transition-transform duration-500">
                                        <User className="w-6 h-6 text-brand-primary dark:text-brand-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-accent transition-colors duration-300">
                                            {review.name}
                                        </h4>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="text-brand-accent font-bold uppercase tracking-wider">{review.role}</span>
                                            <span className="text-gray-400 dark:text-gray-500">• {review.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Bar */}
                    {reviews.length > 1 && (
                        <div className="flex items-center justify-center gap-8 mt-12">
                            <button
                                onClick={prevSlide}
                                className="bg-white dark:bg-[#1F2833] p-3 rounded-full shadow-lg border border-gray-100 dark:border-gray-800 text-brand-primary dark:text-white hover:bg-brand-accent hover:text-white transition-colors"
                                aria-label="Previous Review"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <div className="flex gap-2">
                                {reviews.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-brand-accent w-6' : 'bg-gray-300 dark:bg-gray-700'
                                            }`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextSlide}
                                className="bg-white dark:bg-[#1F2833] p-3 rounded-full shadow-lg border border-gray-100 dark:border-gray-800 text-brand-primary dark:text-white hover:bg-brand-accent hover:text-white transition-colors"
                                aria-label="Next Review"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}
